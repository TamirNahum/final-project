using System;


namespace BOL
{
    public class UserModel
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string IdNumber { get; set; }
        public string UserName { get; set; }
        public DateTime? BirthDate { get; set; }
        public bool IsMale { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public byte UserRole { get; set; }
        public string Image { get; set; }
        //public OrderModel[] Orders { get; set; }


        public string GetUserRole()
        {
            switch (UserRole)
            {
                case 1: return "admin";
                case 2: return "worker";
                default: return "client";
            }
        }
    }
}
