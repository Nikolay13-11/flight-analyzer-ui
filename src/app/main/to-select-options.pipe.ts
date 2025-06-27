import { Pipe, PipeTransform } from '@angular/core';
import { IAirportInfo } from './models/destination.model';

@Pipe({
  name: 'toSelectOptions',
})
export class ToSelectOptionsPipe implements PipeTransform {
  transform(value: IAirportInfo[] | null): any[] {
    if (!value) {
      return [];
    }

    const a = value.reduce(
      (
        acc: {
          [key: string]: {
            code: string;
            countryName: string;
            cities: {
              code: string;
              cityName: string;
            }[];
          };
        },
        curr
      ) => {
        if (curr.country.code in acc) {
          acc[curr.country.code].cities.push({
            cityName: curr.name,
            code: curr.code,
          });
          return acc;
        }
        acc[curr.country.code] = {
          code: curr.country.code,
          countryName: curr.country.name,
          cities: [
            {
              code: curr.code,
              cityName: curr.name,
            },
          ],
        };
        return acc;
      },
      {}
    );

    return Object.keys(a).map((key) => ({ ...a[key] }));
  }
}
