'use strict';

/**
 * Class representing a generic queriable model, which abstracts out
 * underlying Knex db storage
 * @prop {Knex}     qb        Knex instance configured for a table
 * @prop {String}   table     name of underlying table
 */
class baseModel {
  /**
   * @class baseModel
   * @abstract
   * @constructor
   * @param  {Knex}   qb     Knex instance configured for  data storage
   * @param  {String} table  Name of the table to be queried
   * @return {baseModel}         Created instance
   */
  constructor(qb, table) {
    this.qb = qb;
    this.table = table;
  }

  /**
   * Executes a SELECT query and returns the res in a callback function
   * @param  {Object}   criteria   Where conditions
   * @param  {Function} cb         Execution callback
   * @return {Knex}                Executed Knex query
   */
  find(criteria, cb) {
    return this.qb
      .table(this.table)
      .where(criteria)
      .then((res) => {
        if (!(res && res.length))
          res = [];

        return cb(null, res);
      })
      .catch(cb);
  }

  /**
   * Executes an INSERT query and returns the result
   * in a callback function
   * @param  {Object}   data  Value to be inserted
   * @param  {Function} cb    Execution callback
   * @return {Knex}           Executed Knex query
   */
  create(data, cb) {
    return this.qb
      .table(this.table)
      .insert(data)
      .returning('*')
      .then((res) => {
        return cb(null, res);
      })
      .catch(cb);
  }

  /**
   * Executes an Update query and returns the result
   * in a callback function
   * @param  {Object}   criteria  Where conditions for the update
   * @param  {Object}   update    Values to be updated
   * @param  {Function} cb        Execution callback
   * @return {Knex}               Executed Knex query
   */
  update(criteria, update, cb) {
    return this.qb
      .table(this.table)
      .where(criteria)
      .update(update)
      .returning('*')
      .then((res) => {
        return cb(null, res);
      })
      .catch(cb);
  }

  /**
   * Executes a DELETE query and returns the res in a callback function
   * @param  {Object}   criteria   Where conditions
   * @param  {Function} cb         Execution callback
   * @return {Knex}                Executed Knex query
   */
  remove(criteria, cb) {
    return this.qb
      .table(this.table)
      .delete()
      .where(criteria)
      .then((res) => {
        return cb(null, res);
      })
      .catch(cb);
  }
}

module.exports = baseModel;
