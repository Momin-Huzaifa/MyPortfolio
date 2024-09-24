import AuthUser from './src/models/Registeruser.js';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      // Fetch the user from MongoDB
      const user = await AuthUser.findOne({ email: email });

      if (!user) {
        // If no user is found, return an error message
        return done(null, false, { message: 'No user found with email: ' + email });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user); // Return the user if password matches
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await AuthUser.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

export default initialize;