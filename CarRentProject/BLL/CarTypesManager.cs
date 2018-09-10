using BOL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class CarTypesManager
    {
        public static CarTypeModel[] SelectAllCarTypes()
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    return ef.CarTypes
                         .Select(dbCarType => new CarTypeModel
                         {
                             CarTypeId = dbCarType.CarTypeId,
                             DailyCost = dbCarType.DailyCost,
                             DayOverdueCost = dbCarType.DayOverdueCost,
                             IsManual = dbCarType.IsManual,
                             Manufacturer = dbCarType.Manufacturer,
                             ManufacturYear = dbCarType.ManufacturYear,
                             Model = dbCarType.Model
                         }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }

        }


        public static CarType[] SelectCarTypeByTransmission(bool transmission)
        {
            //true-Manual False-Auto

            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    return ef.CarTypes
                         .Where(carType => carType.IsManual == transmission)
                         .Select(dbCarType => new CarType
                         {
                             CarTypeId=dbCarType.CarTypeId,
                             DailyCost = dbCarType.DailyCost,
                             DayOverdueCost = dbCarType.DayOverdueCost,
                             IsManual = dbCarType.IsManual,
                             Manufacturer = dbCarType.Manufacturer,
                             ManufacturYear = dbCarType.ManufacturYear,
                             Model = dbCarType.Model
                         }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }

        }

        public static CarTypeModel[] SelectCarTypeByYear(short year)
        {
            //true-Manual False-Auto

            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    return ef.CarTypes
                         .Where(carType => carType.ManufacturYear == year)
                         .Select(dbCarType => new CarTypeModel
                         {
                             DailyCost = dbCarType.DailyCost,
                             DayOverdueCost = dbCarType.DayOverdueCost,
                             IsManual = dbCarType.IsManual,
                             Manufacturer = dbCarType.Manufacturer,
                             ManufacturYear = dbCarType.ManufacturYear,
                             Model = dbCarType.Model
                         }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }

        }

        public static CarTypeModel[] SelectCarTypeByManufacturer(string manufacturer)
        {
            //true-Manual False-Auto

            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    return ef.CarTypes
                         .Where(carType => carType.Manufacturer == manufacturer)
                         .Select(dbCarType => new CarTypeModel
                         {
                             DailyCost = dbCarType.DailyCost,
                             DayOverdueCost = dbCarType.DayOverdueCost,
                             IsManual = dbCarType.IsManual,
                             Manufacturer = dbCarType.Manufacturer,
                             ManufacturYear = dbCarType.ManufacturYear,
                             Model = dbCarType.Model
                         }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }

        }


        static public bool InsertCarType(CarTypeModel newCarType)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    CarType newDbCarType = new CarType
                    {

                       DailyCost=newCarType.DailyCost,
                       DayOverdueCost=newCarType.DayOverdueCost,
                       IsManual=newCarType.IsManual,
                       Manufacturer=newCarType.Manufacturer,
                       ManufacturYear=newCarType.ManufacturYear,
                       Model=newCarType.Model

                    };

                    ef.CarTypes.Add(newDbCarType);
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

        public static bool UpdateCarTypeByCarTypeId(int carTypeId, CarTypeModel newCarType)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    CarType selectedCarType = ef.CarTypes.FirstOrDefault(dbCarType => dbCarType.CarTypeId == carTypeId);
                    if (selectedCarType == null)
                        return false;

                    selectedCarType.DailyCost = newCarType.DailyCost;
                    selectedCarType.DayOverdueCost = newCarType.DayOverdueCost;
                    selectedCarType.IsManual = newCarType.IsManual;
                    selectedCarType.Manufacturer = newCarType.Manufacturer;
                    selectedCarType.ManufacturYear = newCarType.ManufacturYear;
                    selectedCarType.Model = newCarType.Model;


                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        static public bool DeleteCarType(int carTypeId)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    CarType selectedCarType = ef.CarTypes.FirstOrDefault(dbCarType => (dbCarType.CarTypeId == carTypeId));
                    if (selectedCarType == null)
                        return false;

                    ef.CarTypes.Remove(selectedCarType);
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


    }
}
