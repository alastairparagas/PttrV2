(function (window) {
    'use strict';

    var angular = window.angular,
        AuthService;
    
    angular.module('pttr.auth').service('AuthService', AuthService);
    
    AuthService.$inject = [
        '$rootScope',
        '$state',
        '$firebaseAuth',
        '$firebaseObject',
        '$q',
        'FirebaseRefService'
    ];
    
    AuthService = function ($rootScope,
                             $state,
                             $firebaseAuth,
                             $firebaseObject,
                             $q,
                             FirebaseRefService) {

        /**
            @type {Object}
            @memberof AuthService
            @description Represents a user of the app
            @private
        */
        var user,
        /**
            @type {Object}
            @memberof AuthService
            @description Reference to authentication system in the backend
            @private
        */
            authorizer,
        /**
            @type {Object}
            @memberof AuthService
            @description Holds the textual description of our error constants
            @private
        **/
            errors = {
                USER_NOT_FOUND: 'User was not found.',
                USER_NOT_AUTHORIZED: 'User was not successfully authorized.',
                FIREBASE_ERROR: 'A Firebase error was encountered.'
            },
        /**
            @type {Boolean}
            @memberof AuthService
            @description Is AuthService already initialized?
            @private
        **/
            initialized = false,
        /**
            @type {Object}
            @memberof AuthService
            @description References 'this' in context of AuthService
            @private
        **/
            self = this;
        
        
        /**
            @memberof AuthService
            @description Resets the user object
            @private
        */
        function resetUser() {
            var userProperty;
            for (userProperty in user) {
                if (user.hasOwnProperty(userProperty)) {
                    user[userProperty] = null;
                }
            }
        }
        
        /**
            @memberof AuthService
            @param {Object} userInfo Object representation of the user that abides
                by the interface of the user object representation above.
            @description Assembles our user object - the data representation of
                the user - with the information provided by userInfo. 
            @returns {Bool} TRUE if user was succesfully bootstrapped, 
                FALSE otherwise
            @private
        */
        function bootstrapUser(userInfo) {
            var userProperty,
                session;
            if (userInfo === null) {
                return false;
            }
            if (typeof userInfo !== "object") {
                return false;
            }
            for (userProperty in user) {
                if (user.hasOwnProperty(userProperty)) {
                    if (userInfo.hasOwnProperty(userProperty)
                            && typeof userInfo[userProperty] !== "function"
                            && userInfo !== null
                            && userInfo !== undefined) {
                        user[userProperty] = userInfo[userProperty];
                    } else {
                        resetUser();
                        return false;
                    }
                }
            }
            session = window.JSON.stringify(user);
            window.localStorage.setItem('session', session);
            return true;
        }
        
        /**
            @memberof AuthService
            @description Bootstraps our Authentication Service.
                Initializes our Firebase Auth and if the user
                was already authenticated by Firebase, bootstraps
                Auth to bring back such session.
            @private
        */
        function bootstrapAuth() {
            var session;
            user = {
                id: null,
                email: null,
                name: null,
                type: null
            };
            Object.preventExtensions(user);
            
            authorizer = $firebaseAuth(FirebaseRefService);
            if (authorizer.$getAuth() !== null) {
                session = window.localStorage.getItem('session');
                session = window.JSON.parse(session);
                bootstrapUser(session);
            }
            
            function authGuard(event, toState, toParams, fromState, fromParams) {
                if (toState.data.authType === "individual" &&
                        self.getUser().type !== "individuals") {
                    event.preventDefault();
                    $state.go('app.individual.login');
                } else if (toState.data.authType === "shelter" &&
                            self.getUser().type !== "shelters") {
                    event.preventDefault();
                    $state.go('app.shelter.login');
                }
            }
            $rootScope.$on("$stateChangeStart", authGuard);
            initialized = true;
        }
        bootstrapAuth();
        
        /**
            @memberof AuthService
            @description Checks if the user of given userType exists in the
                appropriate model/table in the database
            @param {String} userEmail Email of user whose existence is being checked
            @param {String} userModel Model where we are checking the user's existence
            @private
        */
        function checkUserExists(userEmail, userModel) {
            var defer = $q.defer();
            
            FirebaseRefService
                .child(userModel)
                .once('value', function (snapshot) {
                    var userList = snapshot.val();
                    if (userList.hasOwnProperty(userEmail) &&
                            userList[userEmail] !== null) {
                        defer.resolve(userList[userEmail]);
                    } else {
                        defer.reject('USER_NOT_FOUND');
                    }
                }, function (error) {
                    defer.reject('FIREBASE_ERROR');
                });
            
            return defer.promise;
        }
        
        /**
            @memberof AuthService
            @description Authorizes the user using our internal authorization
                method, whether that be Firebase or some authentication
                implementation we place in the future.
            @param {String} email Email of user
            @param {String} password Password of user
            @private
        */
        function authorize(email, password) {
            var defer = $q.defer();
            
            authorizer.$authWithPassword({
                email: email,
                password: password
            }, {
                remember: "default"
            }).then(function (authData) {
                defer.resolve(authData);
            }, function (error) {
                defer.reject('USER_NOT_AUTHORIZED');
            });
            
            return defer.promise;
        }
        
        /**
            @memberof AuthService
            @description Logs a user in provided an email and password
            @param {String} email Email Address of the user to log in
            @param {String} password Password of the user to log in
            @param {String} userType Type of user - "individual" or "shelter"
            @returns {HttpPromise} Promise resolved on success, rejected on
                failure
            @private
        */
        function loginUser(email, password, userType) {
            var defer = $q.defer();
            
            checkUserExists(email, userType).then(function (userData) {
                authorize(email, password).then(function (authData) {
                    bootstrapUser({
                        id: authData.uid,
                        email: userData.email,
                        name: userData.name,
                        type: userType
                    });
                    defer.resolve("Login Successful");
                }, function (error) {
                    defer.reject(errors[error]);
                });
            }, function (error) {
                defer.reject(errors[error]);
            });
            
            return defer;
        }
        
        /**
            @memberof AuthService
            @description Creates a user given the new user's information
                and user type
            @param {String} signUpInfo user's signup information
            @param {String} userType Type of user: "individuals" or "shelters"
            @returns {HttpPromise} Promise resolved on success, rejected on
                failure.
            @private
        */
        function signUpUser(signUpInfo, userType) {
            var defer = $q.defer();
            
            checkUserExists(signUpInfo.email, userType)
                .then(function (userData) {
                    defer.reject("A user with that email already exists.");
                }, function (error) {
                    authorizer.$createUser({
                        email: signUpInfo.email,
                        password: signUpInfo.password
                    });
                });
            
            return defer;
        }
        
        /**
            @memberof AuthService
            @description Initalizes AuthService manually if it has not been initialized
        */
        this.initialize = function () {
            if (initialized !== true) {
                bootstrapAuth();
            }
        };

        /**
            @memberof AuthService
            @description Logs a shelter user in
            @param {String} email Email of the shelter to authenticate
            @param {String} password Password of the shelter to authenticate
            @returns {HttpPromise} Promise resolved on success, rejected on
                failure.
        */
        this.loginShelter = function (email, password) {
            return loginUser(email, password, "shelters");
        };
        
        /**
            @memberof AuthService
            @description Logs an individual user in
            @param {String} email Email of the individual to authenticate
            @param {String} password Password of the individual to authenticate
            @returns {HttpPromise} Promise resolved on success, rejected on
                failure.
        */
        this.loginIndividual = function (email, password) {
            return loginUser(email, password, "individuals");
        };

        /**
            @memberof AuthService
            @description Creates the user of type "shelters"
            @param {Object} registrationInfo Object with name, email,
                address, phone and password property that is used to add
                a user.
            @returns {HttpPromise} Promise resolved on success, rejected on
                failure.
        */
        this.signUpShelter = function (signUpInfo) {
            return signUpUser(signUpInfo, "shelters");
        };
        
        /**
            @memberof AuthService
            @description Creates the user of type "individuals"
            @param {Object} signUpInfo Object with name, email, 
                address, phone and password property that is used to add
                a user.
            @returns {HttpPromise} Promise resolved on success, rejected on
                failure.
        */
        this.signUpIndividual = function (signUpInfo) {
            return signUpUser(signUpInfo, "individuals");
        };

        /**
            @memberof AuthService
            @description Returns a reference of the current authenticated
                user.
        */
        this.getUser = function () {
            return angular.copy(user);
        };

        /**
            @memberof AuthService
            @description Logs the current authenticated user out.
        */
        this.logout = function () {
            authorizer.$unAuth();
            resetUser();
        };

        /**
            @memberof AuthService
            @description Checks if a user is logged in.
            @returns {Boolean} TRUE if user is logged in, FALSE if not
        */
        this.isLoggedIn = function () {
            var userProperty;
            for (userProperty in user) {
                if (user.hasOwnProperty(userProperty)
                        && user[userProperty] === null) {
                    return false;
                }
            }
            return true;
        };

    };

}(window));