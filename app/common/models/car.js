module.exports = function(Car) {
  Car.greet = async function(msg) {
    return "message is " + msg;
  };
};
