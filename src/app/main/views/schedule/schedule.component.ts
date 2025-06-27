import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RyanairService } from '../../services/external/ryanair.service';
import {
  distinctUntilChanged,
  filter,
  finalize,
  groupBy,
  map,
  Observable,
  of,
  skipWhile,
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ToSelectOptionsPipe } from '../../to-select-options.pipe';
import { IAirportInfo } from '../../models/destination.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePickerModule } from 'primeng/datepicker';
import { createDisabledDates } from '../../helpers/dates';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/external/api.service';
import { FaresTableComponent } from './components/fares-table/fares-table.component';

@Component({
  selector: 'app-schedule',
  imports: [
    CascadeSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    ToSelectOptionsPipe,
    DatePickerModule,
    ButtonModule,
    FaresTableComponent,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  private ryanairService = inject(RyanairService);
  private apiService = inject(ApiService);
  loadingFrom = signal(true);
  loadingTo = signal(false);
  loadingDates = signal(false);
  private destroyRef = inject(DestroyRef);

  searchFlightsLoading = false;
  analyzeFlightLoading = false;

  // TODO: add types to type variable
  destinationForm = new FormGroup({
    cityFrom: new FormControl<
      | {
          cityName: string;
          code: string;
        }
      | undefined
    >(undefined, Validators.required),
    cityTo: new FormControl<
      | {
          cityName: string;
          code: string;
        }
      | undefined
    >(undefined, Validators.required),
    date: new FormControl(undefined, Validators.required),
  });

  optionsFrom$!: Observable<IAirportInfo[]>;
  optionsTo = signal<IAirportInfo[]>([]);
  availabilities = signal<string[]>([]);

  disableDates = computed(() => createDisabledDates(this.availabilities()));

  minDate = new Date();
  maxDate = computed(() => new Date(this.availabilities().at(-1) ?? ''));

  get cityTo() {
    return this.destinationForm.controls.cityTo;
  }

  get cityFrom() {
    return this.destinationForm.controls.cityFrom;
  }

  get date() {
    return this.destinationForm.controls.date;
  }

  ngOnInit() {
    this.optionsFrom$ = this.ryanairService.getAllDestinations().pipe(
      finalize(() => {
        this.loadingFrom.set(false);
      })
    );

    this.cityFrom.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        filter((targetCity) => targetCity != null),
        tap(() => {
          this.date.setValue(undefined);
          this.loadingTo.set(true);
        }),
        switchMap(({ code }) => {
          return this.ryanairService.getDestinationsForSpecificCode(code).pipe(
            takeUntilDestroyed(this.destroyRef),
            finalize(() => {
              this.loadingTo.set(false);
            })
          );
        }),
        tap((destination) => {
          this.optionsTo.set(destination.map((el) => el.arrivalAirport));
        })
      )
      .subscribe();

    this.cityTo.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        filter((targetCity) => targetCity != null),
        tap(() => {
          this.date.setValue(undefined);
          this.loadingDates.set(true);
        }),
        switchMap(({ code: codeTo }) => {
          if (this.cityFrom.value?.code) {
            return this.ryanairService
              .getAvailabilitiesByCodes(this.cityFrom.value?.code, codeTo)
              .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => {
                  this.loadingDates.set(false);
                })
              );
          }
          return of([]);
        }),
        tap((availabilities) => {
          this.availabilities.set(availabilities);
        })
      )
      .subscribe();
  }

  searchFlights() {
    if (
      this.cityFrom.value?.code &&
      this.cityTo.value?.code &&
      this.date.value
    ) {
      this.apiService.getFlightFares(
        this.cityFrom.value?.code,
        this.cityTo.value?.code,
        this.date.value
      );
    }
  }
  analyzeFlight() {
    if (
      this.cityFrom.value?.code &&
      this.cityTo.value?.code &&
      this.date.value
    ) {
      this.apiService.startFlightToAnalyzing(
        this.cityFrom.value?.code,
        this.cityTo.value?.code,
        this.date.value
      );
    }
  }
}
