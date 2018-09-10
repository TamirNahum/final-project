namespace BOL
{
    public class CarTypeModel
    {
        public int CarTypeId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public decimal DailyCost { get; set; }
        public decimal DayOverdueCost { get; set; }
        public short ManufacturYear { get; set; }
        public bool IsManual { get; set; }
    }
}
