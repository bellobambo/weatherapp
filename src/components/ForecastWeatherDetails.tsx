import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import WeatherDetails, { WeatherDetailsProp } from './WeatherDetails';
import { convertKenlinToCelcius } from '@/utils/convertKenlinToCelcius';

type Props = {}

export interface ForecastWeatherDetailProps extends WeatherDetailsProp {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}



export default function ForecastWeatherDetails(props: ForecastWeatherDetailProps) {

    const {
        weatherIcon = '02d',
        date = '19.09',
        day = 'Monday',
        temp,
        feels_like,
        temp_min,
        temp_max,
        description
    } = props;

    return (
        <Container className='gap-4'>
            <section className='flex gap-4 items-center px-4 '>
                <div className='flex flex-col gap-1 items-center'>
                    <WeatherIcon iconName={weatherIcon} />
                    <p>{date}</p>
                    <p className='text-sm'>{day}</p>
                </div>

                <div className='flex flex-col px-4'>
                    <span className='text-5xl'>
                        {convertKenlinToCelcius(temp ?? 0)}°
                    </span>
                    <p className='text-xs space-x-1 whitespace-nowrap'>
                        <span>Feels Like</span>
                        <span>{convertKenlinToCelcius(feels_like ?? 0)}°</span>
                    </p>
                </div>
            </section>

            <section className='overflow-x-flow flex justify-between gap-4 w-full pr-10'>
                <WeatherDetails {...props} />
            </section>
        </Container>
    )
}