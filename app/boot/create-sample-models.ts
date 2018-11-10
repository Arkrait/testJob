module.exports = function(app) {
  createCars(function(err) {
    console.log("models created");
  });

  function createCars(cb) {
    const car = app.models.Car;
    car.create(
      [
        {
          plate: "WRKN4IT",
          brand: "Chevrolet",
          model: "Camaro",
          ownerCredentials: "+7(800)-555-35-35",
          horsePower: 300
        },
        {
          plate: "TESTPLA",
          brand: "Nissan",
          model: "Skyline",
          ownerCredentials: "+7(999)-999-99-99",
          horsePower: 420
        }
      ],
      cb
    );
  }
};
