using BOL;
using DAL;
using System;
using System.Linq;

namespace BLL
{
    public class OrdersManager
    {
        static public OrderModel[] SelectAllOrders()
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    return ef.Orders.OrderByDescending(order => order.StartRentDate).Select(dbOrder => new OrderModel
                    {
                        OrderId = dbOrder.OrderId,

                        CarId = dbOrder.CarId,
                        EndOfRentDate = dbOrder.EndOfRentDate,
                        ReturnDate = dbOrder.ReturnDate,
                        StartRentDate = dbOrder.StartRentDate,
                        UserId = dbOrder.UserId,
                        User = new UserModel
                        {
                            BirthDate = dbOrder.User.BirthDate,
                            Email = dbOrder.User.Email,
                            FullName = dbOrder.User.FullName,
                            IdNumber = dbOrder.User.IdNumber,
                            Image = dbOrder.User.Image,
                            IsMale = dbOrder.User.IsMale,
                            Password = dbOrder.User.Password,
                            UserId = dbOrder.User.UserId,
                            UserName = dbOrder.User.UserName,
                            UserRole = dbOrder.User.UserRole
                        },
                        Car = new CarModel
                        {
                            AvailableAtBranch = dbOrder.Car.AvailableAtBranch,
                            CarId = dbOrder.Car.CarId,
                            CarNumber = dbOrder.Car.CarNumber,
                            CarTypeModel = new CarTypeModel
                            {
                                CarTypeId = dbOrder.Car.CarType1.CarTypeId,
                                DailyCost = dbOrder.Car.CarType1.DailyCost,
                                DayOverdueCost = dbOrder.Car.CarType1.DayOverdueCost,
                                IsManual = dbOrder.Car.CarType1.IsManual,
                                Manufacturer = dbOrder.Car.CarType1.Manufacturer,
                                ManufacturYear = dbOrder.Car.CarType1.ManufacturYear,
                                Model = dbOrder.Car.CarType1.Model
                            },
                            Branch = new BranchModel
                            {
                                Adrress = dbOrder.Car.Branch.Adrress,
                                BranchName = dbOrder.Car.Branch.BranchName,
                                Latitude = dbOrder.Car.Branch.Latitude,
                                Longitude = dbOrder.Car.Branch.Longitude
                            },
                            Image = dbOrder.Car.Image,
                            IsProperForRent = dbOrder.Car.IsProperForRent,
                            Kilometerage = dbOrder.Car.kilometerage
                        }
                    }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }


        static public OrderModel[] SelectAllUserOrdersByUserName(string userName)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.UserName == userName);
                    if (selectedUser == null)
                        return null;



                    return ef.Orders
                        .Where(order => order.UserId == selectedUser.UserId)
                        .Select(dbOrder => new OrderModel
                        {
                            OrderId = dbOrder.OrderId,
                            CarId = dbOrder.CarId,
                            EndOfRentDate = dbOrder.EndOfRentDate,
                            ReturnDate = dbOrder.ReturnDate,
                            StartRentDate = dbOrder.StartRentDate,
                            UserId = dbOrder.UserId,
                            User = new UserModel
                            {
                                BirthDate = dbOrder.User.BirthDate,
                                Email = dbOrder.User.Email,
                                FullName = dbOrder.User.FullName,
                                IdNumber = dbOrder.User.IdNumber,
                                Image = dbOrder.User.Image,
                                IsMale = dbOrder.User.IsMale,
                                Password = dbOrder.User.Password,
                                UserId = dbOrder.User.UserId,
                                UserName = dbOrder.User.UserName,
                                UserRole = dbOrder.User.UserRole
                            },
                            Car = new CarModel
                            {
                                AvailableAtBranch = dbOrder.Car.AvailableAtBranch,
                                CarId = dbOrder.Car.CarId,
                                CarNumber = dbOrder.Car.CarNumber,
                                CarTypeModel = new CarTypeModel
                                {
                                    CarTypeId = dbOrder.Car.CarType1.CarTypeId,
                                    DailyCost = dbOrder.Car.CarType1.DailyCost,
                                    DayOverdueCost = dbOrder.Car.CarType1.DayOverdueCost,
                                    IsManual = dbOrder.Car.CarType1.IsManual,
                                    Manufacturer = dbOrder.Car.CarType1.Manufacturer,
                                    ManufacturYear = dbOrder.Car.CarType1.ManufacturYear,
                                    Model = dbOrder.Car.CarType1.Model
                                },
                                Branch = new BranchModel
                                {
                                    Adrress = dbOrder.Car.Branch.Adrress,
                                    BranchName = dbOrder.Car.Branch.BranchName,
                                    Latitude = dbOrder.Car.Branch.Latitude,
                                    Longitude = dbOrder.Car.Branch.Longitude
                                },
                                Image = dbOrder.Car.Image,
                                IsProperForRent = dbOrder.Car.IsProperForRent,
                                Kilometerage = dbOrder.Car.kilometerage
                            }
                        }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        static public OrderModel[] SelectAllUserOrdersByUserId(int userId)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    return ef.Orders
                        .Where(order => order.UserId == userId)
                        .OrderByDescending(order=>order.StartRentDate )
                        .Select(dbOrder => new OrderModel
                        {
                            OrderId=dbOrder.OrderId,
                            CarId = dbOrder.CarId,
                            EndOfRentDate = dbOrder.EndOfRentDate,
                            ReturnDate = dbOrder.ReturnDate,
                            StartRentDate = dbOrder.StartRentDate,
                            UserId = dbOrder.UserId,
                            User = new UserModel
                            {
                                BirthDate = dbOrder.User.BirthDate,
                                Email = dbOrder.User.Email,
                                FullName = dbOrder.User.FullName,
                                IdNumber = dbOrder.User.IdNumber,
                                Image = dbOrder.User.Image,
                                IsMale = dbOrder.User.IsMale,
                                Password = dbOrder.User.Password,
                                UserId = dbOrder.User.UserId,
                                UserName = dbOrder.User.UserName,
                                UserRole = dbOrder.User.UserRole
                            },
                            Car = new CarModel
                            {
                                AvailableAtBranch = dbOrder.Car.AvailableAtBranch,
                                CarId = dbOrder.Car.CarId,
                                CarNumber = dbOrder.Car.CarNumber,
                                CarTypeModel = new CarTypeModel
                                {
                                    CarTypeId = dbOrder.Car.CarType1.CarTypeId,
                                    DailyCost = dbOrder.Car.CarType1.DailyCost,
                                    DayOverdueCost = dbOrder.Car.CarType1.DayOverdueCost,
                                    IsManual = dbOrder.Car.CarType1.IsManual,
                                    Manufacturer = dbOrder.Car.CarType1.Manufacturer,
                                    ManufacturYear = dbOrder.Car.CarType1.ManufacturYear,
                                    Model = dbOrder.Car.CarType1.Model
                                },
                                Branch = new BranchModel
                                {
                                    Adrress = dbOrder.Car.Branch.Adrress,
                                    BranchName = dbOrder.Car.Branch.BranchName,
                                    Latitude = dbOrder.Car.Branch.Latitude,
                                    Longitude = dbOrder.Car.Branch.Longitude
                                },
                                Image = dbOrder.Car.Image,
                                IsProperForRent = dbOrder.Car.IsProperForRent,
                                Kilometerage = dbOrder.Car.kilometerage
                            }
                        }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        static public OrderModel[] SelectAllCarOrdersByCarNumber(string carNumber)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    return ef.Orders
                        .Where(order => order.Car.CarNumber == carNumber)
                        .OrderByDescending(order => order.StartRentDate)
                        .Select(dbOrder => new OrderModel
                        {
                            OrderId = dbOrder.OrderId,

                            CarId = dbOrder.CarId,
                            EndOfRentDate = dbOrder.EndOfRentDate,
                            ReturnDate = dbOrder.ReturnDate,
                            StartRentDate = dbOrder.StartRentDate,
                            UserId = dbOrder.UserId,
                            User = new UserModel
                            {
                                BirthDate=dbOrder.User.BirthDate,
                                Email= dbOrder.User.Email,
                                FullName= dbOrder.User.FullName,
                                IdNumber= dbOrder.User.IdNumber,
                                Image= dbOrder.User.Image,
                                IsMale= dbOrder.User.IsMale,
                                Password= dbOrder.User.Password,
                                UserId= dbOrder.User.UserId,
                                UserName= dbOrder.User.UserName,
                                UserRole= dbOrder.User.UserRole
                            },
                            Car = new CarModel
                            {
                                AvailableAtBranch = dbOrder.Car.AvailableAtBranch,
                                CarId = dbOrder.Car.CarId,
                                CarNumber = dbOrder.Car.CarNumber,
                                CarTypeModel = new CarTypeModel
                                {
                                    CarTypeId = dbOrder.Car.CarType1.CarTypeId,
                                    DailyCost = dbOrder.Car.CarType1.DailyCost,
                                    DayOverdueCost = dbOrder.Car.CarType1.DayOverdueCost,
                                    IsManual = dbOrder.Car.CarType1.IsManual,
                                    Manufacturer = dbOrder.Car.CarType1.Manufacturer,
                                    ManufacturYear = dbOrder.Car.CarType1.ManufacturYear,
                                    Model = dbOrder.Car.CarType1.Model
                                },
                                Branch = new BranchModel
                                {
                                    Adrress = dbOrder.Car.Branch.Adrress,
                                    BranchName = dbOrder.Car.Branch.BranchName,
                                    Latitude = dbOrder.Car.Branch.Latitude,
                                    Longitude = dbOrder.Car.Branch.Longitude
                                },
                                Image = dbOrder.Car.Image,
                                IsProperForRent = dbOrder.Car.IsProperForRent,
                                Kilometerage = dbOrder.Car.kilometerage
                            }
                        }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static OrderModel SelectOrderByOrderId(int orderId)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    Order selectedOrder = ef.Orders.FirstOrDefault(dbOrder => (dbOrder.OrderId == orderId));
                    if (selectedOrder == null)
                        return null;

                    return  new OrderModel
                        {
                            OrderId = selectedOrder.OrderId,
                            CarId = selectedOrder.CarId,
                            EndOfRentDate = selectedOrder.EndOfRentDate,
                            ReturnDate = selectedOrder.ReturnDate,
                            StartRentDate = selectedOrder.StartRentDate,
                            UserId = selectedOrder.UserId,
                            User = new UserModel
                            {
                                BirthDate = selectedOrder.User.BirthDate,
                                Email = selectedOrder.User.Email,
                                FullName = selectedOrder.User.FullName,
                                IdNumber = selectedOrder.User.IdNumber,
                                Image = selectedOrder.User.Image,
                                IsMale = selectedOrder.User.IsMale,
                                Password = selectedOrder.User.Password,
                                UserId = selectedOrder.User.UserId,
                                UserName = selectedOrder.User.UserName,
                                UserRole = selectedOrder.User.UserRole
                            },
                            Car = new CarModel
                            {
                                AvailableAtBranch = selectedOrder.Car.AvailableAtBranch,
                                CarId = selectedOrder.Car.CarId,
                                CarNumber = selectedOrder.Car.CarNumber,
                                CarTypeModel = new CarTypeModel
                                {
                                    CarTypeId = selectedOrder.Car.CarType1.CarTypeId,
                                    DailyCost = selectedOrder.Car.CarType1.DailyCost,
                                    DayOverdueCost = selectedOrder.Car.CarType1.DayOverdueCost,
                                    IsManual = selectedOrder.Car.CarType1.IsManual,
                                    Manufacturer = selectedOrder.Car.CarType1.Manufacturer,
                                    ManufacturYear = selectedOrder.Car.CarType1.ManufacturYear,
                                    Model = selectedOrder.Car.CarType1.Model
                                },
                                Branch = new BranchModel
                                {
                                    Adrress = selectedOrder.Car.Branch.Adrress,
                                    BranchName = selectedOrder.Car.Branch.BranchName,
                                    Latitude = selectedOrder.Car.Branch.Latitude,
                                    Longitude = selectedOrder.Car.Branch.Longitude
                                },
                                Image = selectedOrder.Car.Image,
                                IsProperForRent = selectedOrder.Car.IsProperForRent,
                                Kilometerage = selectedOrder.Car.kilometerage
                            }
                        };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool UpdateOrderByOrderId(int orderId,OrderModel newOrder)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    Order selectedOrder = ef.Orders.FirstOrDefault(dbOrder => dbOrder.OrderId == orderId);
                    if (selectedOrder == null)
                        return false;
                    
                    selectedOrder.ReturnDate = newOrder.ReturnDate;
                    selectedOrder.StartRentDate = newOrder.StartRentDate;
                    selectedOrder.EndOfRentDate = newOrder.EndOfRentDate;
                    selectedOrder.CarId = newOrder.CarId;
                    selectedOrder.UserId = newOrder.UserId;
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    

        static public bool InsertOrder(OrderModel newOrder)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    Order newDbOrder = new Order
                    {
                        
                        EndOfRentDate = newOrder.EndOfRentDate,
                        StartRentDate = newOrder.StartRentDate,
                        ReturnDate=newOrder.ReturnDate,
                        UserId = newOrder.UserId,
                        CarId = newOrder.CarId
                        
                        
                    };

                    ef.Orders.Add(newDbOrder);
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

        static public bool DeleteOrder(int orderId)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    Order selectedOrder = ef.Orders.FirstOrDefault(dbOrder => (dbOrder.OrderId == orderId));
                    if (selectedOrder == null)
                        return false;

                    ef.Orders.Remove(selectedOrder);
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

