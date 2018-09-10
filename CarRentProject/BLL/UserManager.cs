using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BOL;
using DAL;

namespace BLL
{
    static public class UserManager
    {

        public static UserModel[] SelectAllUsers()
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    return ef.Users.Select(dbUser => new UserModel
                    {
                        UserId=dbUser.UserId,
                        FullName = dbUser.FullName,
                        IdNumber = dbUser.IdNumber,
                        UserName = dbUser.UserName,
                        BirthDate = dbUser.BirthDate,
                        IsMale = dbUser.IsMale,
                        Email = dbUser.Email,
                        Password = dbUser.Password,
                        UserRole = dbUser.UserRole,
                        Image = dbUser.Image,
                    }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        static public UserModel SelectUserByUserNameAndPassword(string userName,string password)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => (dbUser.UserName == userName&&dbUser.Password==password));
                    if (selectedUser == null)
                        return null;

                    return new UserModel
                    {
                        UserId= selectedUser.UserId,
                        FullName = selectedUser.FullName,
                        IdNumber = selectedUser.IdNumber,
                        UserName = selectedUser.UserName,
                        BirthDate = selectedUser.BirthDate,
                        IsMale = selectedUser.IsMale,
                        Email = selectedUser.Email,
                        Password = selectedUser.Password,
                        UserRole = selectedUser.UserRole,
                        Image = selectedUser.Image
                    };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        static public UserModel SelectUserByFullName(string fullName)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.FullName == fullName);
                    if (selectedUser == null)
                        return null;

                    return new UserModel
                    {
                        FullName = selectedUser.FullName,
                        IdNumber = selectedUser.IdNumber,
                        UserName = selectedUser.UserName,
                        BirthDate = selectedUser.BirthDate,
                        IsMale = selectedUser.IsMale,
                        Email = selectedUser.Email,
                        Password = selectedUser.Password,
                        UserRole = selectedUser.UserRole,
                        Image = selectedUser.Image
                    };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        static public UserModel SelectUserByUserId(int userId)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.UserId == userId);
                    if (selectedUser == null)
                        return null;

                    return new UserModel
                    {
                        UserId=selectedUser.UserId,
                        FullName = selectedUser.FullName,
                        IdNumber = selectedUser.IdNumber,
                        UserName = selectedUser.UserName,
                        BirthDate = selectedUser.BirthDate,
                        IsMale = selectedUser.IsMale,
                        Email = selectedUser.Email,
                        Password = selectedUser.Password,
                        UserRole = selectedUser.UserRole,
                        Image = selectedUser.Image
                    };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool UpdateUserByUserId(int userId, UserModel newUser)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.UserId == userId);
                    if (selectedUser == null)
                        return false;

                    selectedUser.IdNumber = newUser.IdNumber;
                    selectedUser.FullName = newUser.FullName;
                    selectedUser.IsMale = newUser.IsMale;
                    selectedUser.Password = newUser.Password;
                    selectedUser.UserName = newUser.UserName;
                    selectedUser.UserRole = newUser.UserRole;
                    selectedUser.BirthDate = newUser.BirthDate;
                    selectedUser.Email = newUser.Email;
                    selectedUser.Image = newUser.Image;

                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        static public bool DeleteUser(int userId)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {
                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.UserId == userId);
                    if (selectedUser == null)
                        return false;

                    ef.Users.Remove(selectedUser);
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

        static public bool InsertUser(UserModel newUser)
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    User newDbUser = new User
                    {
                        BirthDate = newUser.BirthDate,
                        Email = newUser.Email,
                        FullName = newUser.FullName,
                        IdNumber = newUser.IdNumber,
                        Image = newUser.Image,
                        IsMale = newUser.IsMale,
                        Password = newUser.Password,
                        UserName = newUser.UserName,
                        UserRole = 3

                    };

                    ef.Users.Add(newDbUser);
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
