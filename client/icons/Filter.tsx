import React, { FC } from "react";
import { TIconProps } from "./Icons.types";

const Filter: FC<TIconProps> = ({ width = "20", height = "20" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25822 3.41657C8.28307 3.41661 8.30806 3.41664 8.33317 3.41664C8.35828 3.41664 8.38327 3.41661 8.40812 3.41657C8.71905 3.41613 9.00971 3.41572 9.26748 3.48479C9.95766 3.66973 10.4968 4.20882 10.6817 4.89901C10.7508 5.15677 10.7503 5.44743 10.7499 5.75836C10.7499 5.78321 10.7498 5.8082 10.7498 5.83331V5.92122C10.7772 5.9182 10.805 5.91664 10.8332 5.91664H17.4998C17.9141 5.91664 18.2498 6.25243 18.2498 6.66664C18.2498 7.08086 17.9141 7.41664 17.4998 7.41664H10.8332C10.805 7.41664 10.7772 7.41509 10.7498 7.41207V7.49998C10.7498 7.52509 10.7499 7.55007 10.7499 7.57493C10.7503 7.88586 10.7508 8.17651 10.6817 8.43428C10.4968 9.12447 9.95766 9.66356 9.26748 9.8485C9.00971 9.91756 8.71905 9.91715 8.40812 9.91671C8.38326 9.91668 8.35828 9.91664 8.33317 9.91664C8.30806 9.91664 8.28308 9.91668 8.25822 9.91671C7.94729 9.91715 7.65663 9.91756 7.39887 9.8485C6.70868 9.66356 6.16959 9.12447 5.98465 8.43428C5.91558 8.17651 5.91599 7.88586 5.91643 7.57493C5.91647 7.55007 5.9165 7.52509 5.9165 7.49998V7.41207C5.88914 7.41509 5.86134 7.41664 5.83317 7.41664H4.1665C3.75229 7.41664 3.4165 7.08086 3.4165 6.66664C3.4165 6.25243 3.75229 5.91664 4.1665 5.91664H5.83317C5.86134 5.91664 5.88914 5.9182 5.9165 5.92122V5.83331C5.9165 5.8082 5.91647 5.78321 5.91643 5.75836C5.91599 5.44743 5.91558 5.15677 5.98465 4.89901C6.16959 4.20882 6.70868 3.66973 7.39887 3.48479C7.65663 3.41572 7.94729 3.41613 8.25822 3.41657ZM8.33317 4.91664C7.8974 4.91664 7.82664 4.92309 7.78709 4.93368C7.61455 4.97991 7.47977 5.11469 7.43354 5.28723C7.42295 5.32678 7.4165 5.39754 7.4165 5.83331V7.49998C7.4165 7.93575 7.42295 8.00651 7.43354 8.04605C7.47977 8.2186 7.61455 8.35337 7.78709 8.39961C7.82664 8.4102 7.8974 8.41664 8.33317 8.41664C8.76894 8.41664 8.8397 8.4102 8.87925 8.39961C9.05179 8.35337 9.18657 8.2186 9.2328 8.04605C9.2434 8.00651 9.24984 7.93575 9.24984 7.49998V5.83331C9.24984 5.39754 9.2434 5.32678 9.2328 5.28723C9.18657 5.11469 9.05179 4.97991 8.87925 4.93368C8.8397 4.92309 8.76894 4.91664 8.33317 4.91664ZM13.2582 10.0832C13.2831 10.0833 13.3081 10.0833 13.3332 10.0833C13.3583 10.0833 13.3833 10.0833 13.4081 10.0832C13.7191 10.0828 14.0097 10.0824 14.2675 10.1515C14.9577 10.3364 15.4968 10.8755 15.6817 11.5657C15.7508 11.8234 15.7503 12.1141 15.7499 12.425C15.7499 12.4499 15.7498 12.4749 15.7498 12.5V12.5879C15.7772 12.5849 15.805 12.5833 15.8332 12.5833H17.4998C17.9141 12.5833 18.2498 12.9191 18.2498 13.3333C18.2498 13.7475 17.9141 14.0833 17.4998 14.0833H15.8332C15.805 14.0833 15.7772 14.0818 15.7498 14.0787V14.1666C15.7498 14.1918 15.7499 14.2167 15.7499 14.2416C15.7503 14.5525 15.7508 14.8432 15.6817 15.1009C15.4968 15.7911 14.9577 16.3302 14.2675 16.5152C14.0097 16.5842 13.7191 16.5838 13.4081 16.5834C13.3833 16.5833 13.3583 16.5833 13.3332 16.5833C13.3081 16.5833 13.2831 16.5833 13.2582 16.5834C12.9473 16.5838 12.6566 16.5842 12.3989 16.5152C11.7087 16.3302 11.1696 15.7911 10.9847 15.1009C10.9156 14.8432 10.916 14.5525 10.9164 14.2416C10.9165 14.2167 10.9165 14.1918 10.9165 14.1666V14.0787C10.8891 14.0818 10.8613 14.0833 10.8332 14.0833H4.1665C3.75229 14.0833 3.4165 13.7475 3.4165 13.3333C3.4165 12.9191 3.75229 12.5833 4.1665 12.5833H10.8332C10.8613 12.5833 10.8891 12.5849 10.9165 12.5879V12.5C10.9165 12.4749 10.9165 12.4499 10.9164 12.425C10.916 12.1141 10.9156 11.8234 10.9847 11.5657C11.1696 10.8755 11.7087 10.3364 12.3989 10.1515C12.6566 10.0824 12.9473 10.0828 13.2582 10.0832ZM13.3332 11.5833C12.8974 11.5833 12.8266 11.5898 12.7871 11.6003C12.6145 11.6466 12.4798 11.7814 12.4335 11.9539C12.4229 11.9934 12.4165 12.0642 12.4165 12.5V14.1666C12.4165 14.6024 12.4229 14.6732 12.4335 14.7127C12.4798 14.8853 12.6145 15.02 12.7871 15.0663C12.8266 15.0769 12.8974 15.0833 13.3332 15.0833C13.7689 15.0833 13.8397 15.0769 13.8792 15.0663C14.0518 15.02 14.1866 14.8853 14.2328 14.7127C14.2434 14.6732 14.2498 14.6024 14.2498 14.1666V12.5C14.2498 12.0642 14.2434 11.9934 14.2328 11.9539C14.1866 11.7814 14.0518 11.6466 13.8792 11.6003C13.8397 11.5898 13.7689 11.5833 13.3332 11.5833Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Filter;
