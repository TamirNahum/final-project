using System;


namespace BOL
{
    public class OrderModel
    {
        public int OrderId { get; set; }
        public DateTime StartRentDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public DateTime EndOfRentDate { get; set; }
        public int UserId { get; set; }
        public int CarId { get; set; }
        public UserModel User { get; set; }
        public CarModel Car { get; set; }

    }
}
