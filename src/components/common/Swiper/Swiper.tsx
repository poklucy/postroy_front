import React, { ReactNode, useRef } from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { NavigationOptions, SwiperOptions } from 'swiper/types';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Swiper.module.css';

const ArrowLeft = () => (
    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.2728 7.40002H1.27277M7.77277 13.9L1.27277 7.40002L7.77277 0.900024" stroke="#A4AFB7"
            strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
);

const ArrowRight = () => (
    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.900024 7.40002H14.9M8.40002 13.9L14.9 7.40002L8.40002 0.900024" stroke="#A4AFB7" strokeWidth="1.8"
            strokeLinecap="round"/>
    </svg>
);

interface SwiperProps {
  children: ReactNode[];
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean | { delay: number };
  loop?: boolean;
  centeredSlides?: boolean;
  className?: string;
  slideClassName?: string;
  breakpoints?: Record<number, SwiperOptions>;
  onSlideChange?: (swiper: SwiperType) => void;
  customNavigation?: {
    prevEl?: string | HTMLElement | null;
    nextEl?: string | HTMLElement | null;
  };
  renderPrevButton?: () => ReactNode;
  renderNextButton?: () => ReactNode;
}

export const Swiper: React.FC<SwiperProps> = ({
                                                children,
                                                slidesPerView = 1,
                                                spaceBetween = 20,
                                                navigation = true,
                                                pagination = true,
                                                autoplay = false,
                                                loop = false,
                                                centeredSlides = false,
                                                className = '',
                                                slideClassName = '',
                                                breakpoints,
                                                onSlideChange,
                                                customNavigation,
                                                renderPrevButton,
                                                renderNextButton,
                                              }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const modules = [];
  if (navigation) modules.push(Navigation);
  if (pagination) modules.push(Pagination);
  if (autoplay) modules.push(Autoplay);

  const autoplayConfig = autoplay === true
      ? { delay: 3000, disableOnInteraction: false }
      : typeof autoplay === 'object'
          ? autoplay
          : false;

  const navigationConfig = navigation
      ? {
        prevEl: customNavigation?.prevEl || prevRef.current,
        nextEl: customNavigation?.nextEl || nextRef.current,
      }
      : false;

  const defaultPrevButton = renderPrevButton ? (
      renderPrevButton()
  ) : (
      <div ref={prevRef} className={styles.customPrev}>
        <ArrowLeft />
      </div>
  );

  const defaultNextButton = renderNextButton ? (
      renderNextButton()
  ) : (
      <div ref={nextRef} className={styles.customNext}>
        <ArrowRight />
      </div>
  );

  return (
      <div className={`${styles.swiperWrapper} ${className}`}>
        <SwiperComponent
            modules={modules}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            navigation={navigationConfig}
            autoplay={autoplayConfig}
            loop={loop}
            centeredSlides={centeredSlides}
            breakpoints={breakpoints}
            onSlideChange={onSlideChange}
            className={styles.swiper}
            onInit={(swiper) => {
              if (navigation && !customNavigation) {
                const navigationParams = swiper.params.navigation as NavigationOptions;
                navigationParams.prevEl = prevRef.current;
                navigationParams.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
        >
          {React.Children.map(children, (child, index) => (
              <SwiperSlide key={index} className={`${styles.slide} ${slideClassName}`}>
                {child}
              </SwiperSlide>
          ))}
        </SwiperComponent>

        {navigation && !customNavigation && (
            <>
              {defaultPrevButton}
              {defaultNextButton}
            </>
        )}
      </div>
  );
};
