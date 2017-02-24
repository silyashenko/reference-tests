import {assert} from 'chai';
import {payload, people} from '../serialization';
// you can ge row data form payload.js file

describe('payload', function () {

  // in this tests try to use as least as possible number of assignments

  it('car quantity with owners older than 20 years', function () {

    let answer;

    const maxAge = 20;
    const cars   = payload.data.filter((item) => {
      return item.type === 'Car';
    });

    const isOwnerElderThen = function isOwnerElderThen (owner, maxAge) {
      return owner.personalInfo.age <= maxAge;
    };

    const getYoungOwners = function getYoungOwners (owners, maxAge) {
      return owners.filter((owner) => {
        return isOwnerElderThen(owner, maxAge);
      });
    };

    const carsWithYoungOwner = cars.filter((car) => {
      const owners       = car.owners;
      const youngerOwner = getYoungOwners(owners, maxAge);

      return youngerOwner.length > 0;
    });

    answer = carsWithYoungOwner.length;

    assert.equal(answer, 2);

  });

  it('all car colors separated by comma without duplicates', function () {

    let answer;

    const cars = payload.data.filter((item) => {
      return item.type === 'Car';
    });

    const colors = cars.map((car) => {
      return car.attrs.color;
    });

    const uniqColors = colors.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    answer = uniqColors.join(',');

    assert.equal(answer, 'red,yellow');

  });

  it('id\'s of all vehicles separated by comma', function () {

    let answer;

    const cars    = payload.data.filter((item) => {
      return item.type === 'Car';
    });
    const carsIds = cars.map((car) => {
      return car.id;
    });

    answer = carsIds.join(',');

    assert.equal(answer, '1,3,6,4');

  });

  it('summary price of all items', function () {

    let answer;

    const items = payload.data;

    answer = items.reduce((total, car) => {
      return total += car.attrs.price;
    }, 0);

    assert.equal(answer, 42800);

  });

  it('price of all things john has own', function () {

    let answer;

    const things = payload.data;

    const totalPrice = function totalPrice (items) {
      return items.reduce((total, item) => {
        return total += item.attrs.price;
      }, 0);
    };

    const uniq = function uniq (arr) {
      return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    };

    const getMapOfInnerFieldBy = function getMapOfInnerFieldBy (arr, field) {
      const allElements = arr
        .reduce((res, item) => {
          res = res.concat(item[field]);
          return res;
        }, []);

      return uniq(allElements);
    };

    const allOwners = getMapOfInnerFieldBy(things, 'owners');

    const john = allOwners.find((owner) => {
      return owner.firstName.toLowerCase() === 'john';
    });

    const johnCars = things.filter((car) => {
      const owners = car.owners;
      return owners.includes(john);
    });

    answer = totalPrice(johnCars);

    assert.equal(answer, 25000);

  });

  it('all cities', function () {

    let answer;

    const things = payload.data;

    const uniq = function uniq (arr) {
      return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    };

    const getMapOfInnerFieldBy = function getMapOfInnerFieldBy (arr, field) {
      const allElements = arr
        .reduce((res, item) => {
          res = res.concat(item[field]);
          return res;
        }, []);

      return uniq(allElements);
    };

    const allOwners = getMapOfInnerFieldBy(things, 'owners');
    const allCities = getMapOfInnerFieldBy(allOwners, 'cities');

    answer = allCities.join(',');

    assert.equal(answer, 'New York,Boston,Columbia,Rapture');

  });
});
