'use client'

import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from 'axios';
import Loading from "@/components/Loading";
import { format } from "date-fns/format";
import { parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertKenlinToCelcius } from "@/utils/convertKenlinToCelcius";


type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};


export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=nigeria&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        return data;
      } catch (error) {
        console.log(error)
      }
    },
  });


  console.log('data', data)
  console.log('data country', data?.city.country)


  const firstdata = data?.list[0]


  if (isLoading) return (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a10" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#080707"></stop><stop offset=".3" stop-color="#080707" stop-opacity=".9"></stop><stop offset=".6" stop-color="#080707" stop-opacity=".6"></stop><stop offset=".8" stop-color="#080707" stop-opacity=".3"></stop><stop offset="1" stop-color="#080707" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a10)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#080707" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
    <div className="flex justify-center items-start">
      <Loading />
    </div>
  );


  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4 text-black">
        {/* today data */}
        <section>
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p> {format(parseISO(firstdata?.dt_txt ?? ''), 'EEEE')} </p>
              <p className="text-lg "> {format(parseISO(firstdata?.dt_txt ?? ''), 'dd.MM.yyy')} </p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertKenlinToCelcius(firstdata?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels Like</span>
                  <span>
                    {convertKenlinToCelcius(firstdata?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKenlinToCelcius(firstdata?.main.temp_min ?? 0)}°↓
                  </span>
                  <span>
                    {convertKenlinToCelcius(firstdata?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) =>
                  <div key={i} className="flex flex-col justify-between gap-2 text-xs font-semibold">
                    <p className="whitespace-nowrap"> {format(parseISO(d.dt_txt), 'h:mm a')}</p>
                  </div>
                )}
              </div>
            </Container>
            <div>

            </div>
          </div>
        </section>


        {/* 7 days forcast data */}

        <section></section>
      </main>
    </div>
  );
}
