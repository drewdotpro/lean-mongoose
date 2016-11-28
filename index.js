"use strict";
const mongoose = require("mongoose");
const _ = require("lodash");

//Overwrite default model behaviour to always have lean enabled
const __setOptions = mongoose.Query.prototype.setOptions;
mongoose.Query.prototype.setOptions = function (options, overwrite) {
    __setOptions.apply(this, arguments);
    //Mongoose < 4.5.4
    if (this.options && _.isNil(this.options.lean)) {
        this.options.lean = true;
    }
    //Mongoose >= 4.5.4
    if (this._mongooseOptions && _.isNil(this._mongooseOptions.lean)) {
        this._mongooseOptions.lean = true;
    }
    return this;
};

module.exports = mongoose;