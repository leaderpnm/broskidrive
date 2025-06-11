export interface RouteCalculation {
  distance: number;
  duration: number;
  totalPrice: number;
}

export interface DistanceCalculatorConfig {
  basePrice: number;
  pricePerKm: number;
  nightSurcharge: number;
  weekendSurcharge: number;
}

export const defaultConfig: DistanceCalculatorConfig = {
  basePrice: 8.00,
  pricePerKm: 2.50,
  nightSurcharge: 0.25, // 25%
  weekendSurcharge: 0.15, // 15%
};

export function calculatePrice(
  distance: number, 
  config: DistanceCalculatorConfig = defaultConfig,
  isNight: boolean = false,
  isWeekend: boolean = false
): number {
  let price = config.basePrice + (distance * config.pricePerKm);
  
  if (isNight) {
    price += price * config.nightSurcharge;
  }
  
  if (isWeekend) {
    price += price * config.weekendSurcharge;
  }
  
  return Math.round(price * 100) / 100; // Round to 2 decimal places
}

export function isNightTime(time: string): boolean {
  const hour = parseInt(time.split(':')[0]);
  return hour >= 22 || hour < 6;
}

export function isWeekendDay(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

// Mock function to simulate Google Maps API call
export function calculateDistanceAndDuration(
  startAddress: string,
  endAddress: string
): Promise<{ distance: number; duration: number }> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Mock calculation based on address length (simple simulation)
      const mockDistance = Math.round((Math.random() * 45 + 5) * 100) / 100;
      const mockDuration = Math.round(mockDistance * 2.2); // ~2.2 minutes per km
      
      resolve({
        distance: mockDistance,
        duration: mockDuration
      });
    }, 1000);
  });
}
