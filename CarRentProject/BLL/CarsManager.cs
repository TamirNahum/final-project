using System;
using System.Linq;
using DAL;
using BOL;

namespace BLL
{
    public class CarsManager
    {
       

        public static CarModel[] SelectAllCars()
        {
            // try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    return ef.Cars.OrderBy(car=>car.CarType)
                        .Select(dbCar => new CarModel
                    {
                        AvailableAtBranch = dbCar.AvailableAtBranch,
                        CarNumber = dbCar.CarNumber,
                        CarId = dbCar.CarId,
                        Image = dbCar.Image,

                        IsProperForRent = dbCar.IsProperForRent,

                        Kilometerage = dbCar.kilometerage,
                        CarTypeModel = new CarTypeModel
                        {
                            CarTypeId = dbCar.CarType1.CarTypeId,
                            DailyCost = dbCar.CarType1.DailyCost,
                            DayOverdueCost = dbCar.CarType1.DayOverdueCost,
                            IsManual = dbCar.CarType1.IsManual,
                            Manufacturer = dbCar.CarType1.Manufacturer,
                            ManufacturYear = dbCar.CarType1.ManufacturYear,
                            Model = dbCar.CarType1.Model
                        },
                        Branch = new BranchModel
                        {
                            BranchId = dbCar.Branch.BranchId,
                            Adrress = dbCar.Branch.Adrress,
                            BranchName = dbCar.Branch.BranchName,
                            Latitude = dbCar.Branch.Latitude,
                            Longitude = dbCar.Branch.Longitude
                        }
                        //  IsFreeForRent = IsCarFreeForRent(dbCar.CarNumber)

                    }).ToArray();

                }
            }
            //catch (Exception)
            //{
            //    return null;
            //}
        }

        public static CarModel[] SelectAllProperCars()
        {
            // try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    return ef.Cars.OrderBy(car => car.CarType).Where(dbCar=>dbCar.IsProperForRent==true)
                        .Select(dbCar => new CarModel
                        {
                            AvailableAtBranch = dbCar.AvailableAtBranch,
                            CarNumber = dbCar.CarNumber,
                            CarId = dbCar.CarId,
                            Image = dbCar.Image,

                            IsProperForRent = dbCar.IsProperForRent,

                            Kilometerage = dbCar.kilometerage,
                            CarTypeModel = new CarTypeModel
                            {
                                CarTypeId = dbCar.CarType1.CarTypeId,
                                DailyCost = dbCar.CarType1.DailyCost,
                                DayOverdueCost = dbCar.CarType1.DayOverdueCost,
                                IsManual = dbCar.CarType1.IsManual,
                                Manufacturer = dbCar.CarType1.Manufacturer,
                                ManufacturYear = dbCar.CarType1.ManufacturYear,
                                Model = dbCar.CarType1.Model
                            },
                            Branch = new BranchModel
                            {
                                BranchId = dbCar.Branch.BranchId,
                                Adrress = dbCar.Branch.Adrress,
                                BranchName = dbCar.Branch.BranchName,
                                Latitude = dbCar.Branch.Latitude,
                                Longitude = dbCar.Branch.Longitude
                            }
                            //  IsFreeForRent = IsCarFreeForRent(dbCar.CarNumber)

                        }).ToArray();

                }
            }
            //catch (Exception)
            //{
            //    return null;
            //}
        }


        public static CarModel SelectCarByCarNumber(string carNumber)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    Car car = ef.Cars.FirstOrDefault(dbCar => dbCar.CarNumber == carNumber);
                    if (car == null)
                        return null;

                    return new CarModel
                    {
                        CarId = car.CarId,
                        AvailableAtBranch = car.AvailableAtBranch,
                        CarNumber = car.CarNumber,
                        Image = car.Image,
                        IsProperForRent = car.IsProperForRent,
                        Kilometerage = car.kilometerage,
                        CarTypeModel = new CarTypeModel
                        {
                            CarTypeId = car.CarType1.CarTypeId,
                            DailyCost = car.CarType1.DailyCost,
                            DayOverdueCost = car.CarType1.DayOverdueCost,
                            IsManual = car.CarType1.IsManual,
                            Manufacturer = car.CarType1.Manufacturer,
                            ManufacturYear = car.CarType1.ManufacturYear,
                            Model = car.CarType1.Model
                        },
                        Branch = new BranchModel
                        {
                            BranchId = car.Branch.BranchId,
                            Adrress = car.Branch.Adrress,
                            BranchName = car.Branch.BranchName,
                            Latitude = car.Branch.Latitude,
                            Longitude = car.Branch.Longitude
                        }

                    };
                }
            }

            catch (Exception)
            {
                return null;
            }
        }

        public static bool IsCarExists(string carNumber)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    Car car = ef.Cars.FirstOrDefault(dbCar => dbCar.CarNumber == carNumber);
                    if (car == null)
                        return false;
                    return true;
                 
                }
            }

            catch (Exception)
            {
                return false;
            }
        }

        static public bool InsertCar(CarModel newCar)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    Car newDbCar = new Car
                    {

                       AvailableAtBranch= newCar.AvailableAtBranch,
                       CarNumber= newCar.CarNumber,
                       Image= newCar.Image,
                       kilometerage= newCar.Kilometerage,
                       IsProperForRent= newCar.IsProperForRent,
                       CarType= newCar.CarType

                    };

                    ef.Cars.Add(newDbCar);
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public static bool UpdateCarByCarId(int carId, CarModel newCar)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    Car selectedCar = ef.Cars.FirstOrDefault(dbCar => dbCar.CarId == carId);
                    if (selectedCar == null)
                        return false;

                    selectedCar.AvailableAtBranch = newCar.AvailableAtBranch;
                    selectedCar.CarNumber = newCar.CarNumber;
                    selectedCar.CarType = newCar.CarType;
                    selectedCar.Image = newCar.Image;
                    selectedCar.IsProperForRent = newCar.IsProperForRent;
                    selectedCar.kilometerage = newCar.Kilometerage;
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        static public bool DeleteCar(int carId)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    Car selectedCar = ef.Cars.FirstOrDefault(dbCar => (dbCar.CarId == carId));
                    if (selectedCar == null)
                        return false;

                    ef.Cars.Remove(selectedCar);
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public static CarModel[] SelectCarsByTransmission(string isManual)
        {
              try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {



                    return ef.Cars
                        .Where(car => car.CarType1.IsManual.ToString() == isManual)
                        .Select(car => new CarModel
                        {
                        CarId = car.CarId,
                        AvailableAtBranch = car.AvailableAtBranch,
                        CarNumber = car.CarNumber,
                        Image = car.Image,
                        IsProperForRent = car.IsProperForRent,
                        Kilometerage = car.kilometerage,
                        CarTypeModel = new CarTypeModel
                        {
                            CarTypeId = car.CarType1.CarTypeId,
                            DailyCost = car.CarType1.DailyCost,
                            DayOverdueCost = car.CarType1.DayOverdueCost,
                            IsManual = car.CarType1.IsManual,
                            Manufacturer = car.CarType1.Manufacturer,
                            ManufacturYear = car.CarType1.ManufacturYear,
                            Model = car.CarType1.Model
                        },
                        Branch = new BranchModel
                        {
                            BranchId = car.Branch.BranchId,
                            Adrress = car.Branch.Adrress,
                            BranchName = car.Branch.BranchName,
                            Latitude = car.Branch.Latitude,
                            Longitude = car.Branch.Longitude
                        }

                    }).ToArray();
                }
            }

            catch (Exception)
            {
                return null;
            }
        }

        public static CarModel[] SelectCarsByManufacturer(string manufacturer)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {



                    return ef.Cars
                        .Where(car => car.CarType1.Manufacturer == manufacturer)
                        .Select(car => new CarModel
                        {
                            CarId = car.CarId,
                            AvailableAtBranch = car.AvailableAtBranch,
                            CarNumber = car.CarNumber,
                            Image = car.Image,
                            IsProperForRent = car.IsProperForRent,
                            Kilometerage = car.kilometerage,
                            CarTypeModel = new CarTypeModel
                            {
                                CarTypeId = car.CarType1.CarTypeId,
                                DailyCost = car.CarType1.DailyCost,
                                DayOverdueCost = car.CarType1.DayOverdueCost,
                                IsManual = car.CarType1.IsManual,
                                Manufacturer = car.CarType1.Manufacturer,
                                ManufacturYear = car.CarType1.ManufacturYear,
                                Model = car.CarType1.Model
                            },
                            Branch = new BranchModel
                            {
                                BranchId = car.Branch.BranchId,
                                Adrress = car.Branch.Adrress,
                                BranchName = car.Branch.BranchName,
                                Latitude = car.Branch.Latitude,
                                Longitude = car.Branch.Longitude
                            }

                        }).ToArray();
                }
            }

            catch (Exception)
            {
                return null;
            }
        }

        public static CarModel[] SelectCarsByModel(string model)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {



                    return ef.Cars
                        .Where(car => car.CarType1.Model == model)
                        .Select(car => new CarModel
                        {
                            CarId = car.CarId,
                            AvailableAtBranch = car.AvailableAtBranch,
                            CarNumber = car.CarNumber,
                            Image = car.Image,
                            IsProperForRent = car.IsProperForRent,
                            Kilometerage = car.kilometerage,
                            CarTypeModel = new CarTypeModel
                            {
                                CarTypeId = car.CarType1.CarTypeId,
                                DailyCost = car.CarType1.DailyCost,
                                DayOverdueCost = car.CarType1.DayOverdueCost,
                                IsManual = car.CarType1.IsManual,
                                Manufacturer = car.CarType1.Manufacturer,
                                ManufacturYear = car.CarType1.ManufacturYear,
                                Model = car.CarType1.Model
                            },
                            Branch = new BranchModel
                            {
                                BranchId = car.Branch.BranchId,
                                Adrress = car.Branch.Adrress,
                                BranchName = car.Branch.BranchName,
                                Latitude = car.Branch.Latitude,
                                Longitude = car.Branch.Longitude
                            }

                        }).ToArray();
                }
            }

            catch (Exception)
            {
                return null;
            }
        }
        public static CarModel[] SelectCarsByManufecturYear(int manufecturYear)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {



                    return ef.Cars
                        .Where(car => car.CarType1.ManufacturYear == manufecturYear)
                        .Select(car => new CarModel
                        {
                            CarId = car.CarId,
                            AvailableAtBranch = car.AvailableAtBranch,
                            CarNumber = car.CarNumber,
                            Image = car.Image,
                            IsProperForRent = car.IsProperForRent,
                            Kilometerage = car.kilometerage,
                            CarTypeModel = new CarTypeModel
                            {
                                CarTypeId = car.CarType1.CarTypeId,
                                DailyCost = car.CarType1.DailyCost,
                                DayOverdueCost = car.CarType1.DayOverdueCost,
                                IsManual = car.CarType1.IsManual,
                                Manufacturer = car.CarType1.Manufacturer,
                                ManufacturYear = car.CarType1.ManufacturYear,
                                Model = car.CarType1.Model
                            },
                            Branch = new BranchModel
                            {
                                BranchId = car.Branch.BranchId,
                                Adrress = car.Branch.Adrress,
                                BranchName = car.Branch.BranchName,
                                Latitude = car.Branch.Latitude,
                                Longitude = car.Branch.Longitude
                            }

                        }).ToArray();
                }
            }

            catch (Exception)
            {
                return null;
            }
        }

    }


}



