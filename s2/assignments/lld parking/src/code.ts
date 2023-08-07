
export class Vehicle {
    vehicleType: "Car" | "Bike" | "Bus";
    registrationNumber: number;
    color: string;
  
    constructor(vehicleType: "Car" | "Bike" | "Bus", registrationNumber: number, color: string) {
      this.vehicleType = vehicleType;
      this.registrationNumber = registrationNumber;
      this.color = color;
    }
  }
  
  export class Car extends Vehicle {
    constructor(registrationNumber: number, color: string) {
      super("Car", registrationNumber, color);
    }
  }
  
  export class Bike extends Vehicle {
    constructor(registrationNumber: number, color: string) {
      super("Bike", registrationNumber, color);
    }
  }
  
  export class Bus extends Vehicle {
    constructor(registrationNumber: number, color: string) {
      super("Bus", registrationNumber, color);
    }
  }
  
  export class Slot {
    type: "Car" | "Bike" | "Bus";
    isBooked: boolean;
  
    constructor(type: "Car" | "Bike" | "Bus") {
      this.type = type;
      this.isBooked = false;
    }
  }
  
  export class ParkingSlot {
    maxLimit: number;
    parkingSpots: Slot[];
  
    constructor(maxLimit: number) {
      this.maxLimit = maxLimit;
      this.parkingSpots = [];
    }
  
    addSlots(slot: Slot): number {
      if (this.parkingSpots.length < this.maxLimit) {
        this.parkingSpots.push(slot);
      }
      return this.parkingSpots.length;
    }
  
    availableSlot(vehicleType: "Car" | "Bike" | "Bus"): number {
      return this.parkingSpots.filter(
        (slot) => slot.type === vehicleType && !slot.isBooked
      ).length;
    }
  
    bookSlot(vehicle: Car | Bike | Bus): boolean {
      const slot = this.parkingSpots.find(
        (slot) => slot.type === vehicle.vehicleType && !slot.isBooked
      );
  
      if (slot) {
        slot.isBooked = true;
        return true;
      }
  
      return false;
    }
  }
  