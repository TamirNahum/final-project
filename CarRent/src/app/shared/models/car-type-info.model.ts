export interface CarTypeInfo {
      CarTypeId?:number;
    Manufacturer:string;
    Model: string;
    DailyCost: number;
    DayOverdueCost: number;
    ManufacturYear:number;
    IsManual:boolean;
}

/**        public int CarTypeId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public decimal DailyCost { get; set; }
        public decimal DayOverdueCost { get; set; }
        public short ManufacturYear { get; set; }
        public bool IsManual { get; set; } */