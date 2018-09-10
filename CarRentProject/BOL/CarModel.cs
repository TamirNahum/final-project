namespace BOL
{
   public class CarModel
    {
        public int CarId { get; set; }
        public int CarType { get; set; }
        public string CarNumber { get; set; }
        public int Kilometerage { get; set; }
        public bool IsProperForRent { get; set; }
        public bool IsFreeForRent { get; set; }
        public int AvailableAtBranch { get; set; }
        public string Image { get; set; }
        public CarTypeModel CarTypeModel { get; set; }
        public BranchModel Branch { get; set; }
    }
}
