import passport = require('passport')
import User = require('../models/User')
import PassportGithub = require('passport-github')
import configuration = require('../configuration')
import mongoose = require('mongoose')

const GitHubStrategy = PassportGithub.Strategy

const githubInfo: PassportGithub.StrategyOption = {
  clientID: configuration.github.clientID,
  clientSecret: configuration.github.clientSecret,
  callbackURL: configuration.baseURL + '/auth/github/callback',
  scope: ['user:email']
}

passport.serializeUser(function (_id: mongoose.Types.ObjectId, done) {
  done(null, _id.toString())
})

passport.deserializeUser(async function (id: mongoose.Types.ObjectId | string, done) {
  try {
    done(null, new mongoose.mongo.ObjectId(id))
  } catch (error) {
    done(error)
  }
})

passport.use(new GitHubStrategy(githubInfo,
  async function (accessToken, refreshToken, profile, cb) {
    try {
      // Try to find an user
      let user = await User
        .findOne({
          githubId: profile.id
        })
      // If the user doesn't exist, create a new user
      if (user == null) {
        user = await User
          .create({
            uniqueName: profile.username,
            displayName: profile.displayName || profile.username,
            email: profile.emails[0] && profile.emails[0].value,
            githubId: profile.id,
            photo: profile.photos[0] && profile.photos[0].value
          })
      }

      cb(null, user._id)
    } catch (error) {
      cb(error)
    }
  }
))

export = passport
