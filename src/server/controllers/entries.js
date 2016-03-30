'use strict';

const model = require('../models/index').entries;
const status = require('http-status');
const createError = require('http-errors');
const uuid = require('uuid');

/**
 * Controller that is responsible for all the actions on Entry entities.
 */
class EntriesController {

  /**
   * Loads entries from the database.
   * @param {Object}    req    Express.js request object.
   * @param {Object}    res    Express.js response object.
   * @param {Function}  next   Callback to the Express.js middleware chain.
   * */
  static findAll(req, res, next) {
    return model.find({}, (err, entries) => {
      if (err)
        return next(err);
      return res.jsonp(entries);
    });
  }

  /**
   * Loads one entry from the database.
   * @param {Object}    req    Express.js request object.
   * @param {Object}    res    Express.js response object.
   * @param {Function}  next   Callback to the Express.js middleware chain.
   * */
  static findOne(req, res, next) {
    return model.find(req.params, (err, entries) => {
      if (err)
        return next(err);

      if (!entries.length)
        return next(createError(status.NOT_FOUND));

      return res.jsonp(entries[0]);
    });
  }


  /**
   * Creates a new Entry and responds with full entity data.
   * @param {Object}    req    Express.js request object.
   * @param {Object}    res    Express.js response object.
   * @param {Function}  next   Callback to the Express.js middleware chain.
   */
  static create(req, res, next) {
    if (!req.body.title) {
      return next(createError(status.BAD_REQUEST, 'Missing "title" field!'))
    }

    const entry = {
      title: req.body.title,
      completed: false,
      id: uuid.v1()
    };

    return model.create(entry, (err) => {
      if (err)
        return next(err);
      return res.status(status.CREATED).jsonp(entry);
    })
  }

}

module.exports = EntriesController;
