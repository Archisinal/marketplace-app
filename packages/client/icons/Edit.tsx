import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Edit: FC<TIconProps> = ({ width = '16', height = '16', ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.90755 2.20893C9.29025 2.03027 9.7197 1.97735 10.1343 2.05776C10.4175 2.11268 10.6544 2.23836 10.8681 2.37874C11.0687 2.51057 11.2963 2.68825 11.5535 2.88901L11.5973 2.92321C11.8545 3.12395 12.0821 3.3016 12.2587 3.46425C12.4468 3.63746 12.6262 3.83672 12.7482 4.09813C12.9269 4.48084 12.9798 4.91029 12.8994 5.32492C12.8445 5.60813 12.7188 5.84499 12.5784 6.05867C12.4466 6.25934 12.2689 6.48694 12.0681 6.74412L7.32899 12.8154C7.31622 12.8318 7.30363 12.8479 7.29118 12.8639C7.07134 13.1458 6.89819 13.3679 6.68344 13.5505C6.50184 13.705 6.30092 13.8352 6.08574 13.9379C5.83128 14.0593 5.55788 14.1267 5.21076 14.2122C5.1911 14.217 5.1712 14.2219 5.15106 14.2269L4.06076 14.4961C3.90987 14.5333 3.75227 14.5723 3.61569 14.5933C3.46616 14.6163 3.25518 14.6335 3.02645 14.5602C2.74345 14.4696 2.50199 14.2811 2.34537 14.0286C2.21879 13.8245 2.18425 13.6156 2.17025 13.465C2.15745 13.3274 2.15697 13.1651 2.15651 13.0096L2.15294 11.8866C2.15288 11.8659 2.1528 11.8454 2.15273 11.8251C2.15141 11.4676 2.15037 11.186 2.20637 10.9097C2.25372 10.6761 2.33126 10.4495 2.43704 10.2359C2.56212 9.98319 2.73549 9.76132 2.9556 9.47962C2.96807 9.46367 2.98069 9.44752 2.99345 9.43117L7.73261 3.35986C7.93335 3.10267 8.11101 2.87505 8.27367 2.69845C8.44688 2.51039 8.64614 2.33097 8.90755 2.20893ZM9.84876 3.53033C9.7451 3.51022 9.63774 3.52345 9.54207 3.56812C9.53155 3.57303 9.48716 3.59504 9.377 3.71465C9.27006 3.83076 9.14289 3.99122 8.94923 4.23905L10.9199 5.77732C11.1133 5.5293 11.2381 5.36698 11.3248 5.23505C11.4141 5.09915 11.4246 5.05074 11.4268 5.03935C11.4469 4.93569 11.4337 4.82833 11.3891 4.73265C11.3841 4.72213 11.3621 4.67774 11.2425 4.56759C11.1165 4.45148 10.9381 4.31153 10.6524 4.08853C10.3668 3.86553 10.1877 3.7265 10.0445 3.6324C9.90857 3.54312 9.86016 3.53254 9.84876 3.53033ZM9.99694 6.95975L8.02624 5.42146L4.17587 10.3541C3.90064 10.7067 3.83002 10.803 3.78134 10.9013C3.73326 10.9985 3.69801 11.1014 3.67649 11.2076C3.65469 11.3152 3.65151 11.4345 3.65293 11.8818L3.65643 12.9808C3.65651 13.0055 3.65658 13.0288 3.65668 13.0507C3.67801 13.0455 3.70058 13.0399 3.72461 13.034L4.79153 12.7706C5.22579 12.6634 5.34079 12.6313 5.43984 12.5841C5.53765 12.5374 5.62897 12.4782 5.71152 12.408C5.79511 12.3369 5.87134 12.245 6.14657 11.8924L9.99694 6.95975ZM3.36606 13.1133C3.36608 13.1133 3.36697 13.1132 3.36865 13.1132L3.36606 13.1133ZM3.66608 13.3455C3.6664 13.347 3.66653 13.3478 3.66651 13.3479L3.66608 13.3455ZM7.91646 14C7.91646 13.5858 8.25225 13.25 8.66646 13.25H13.3331C13.7473 13.25 14.0831 13.5858 14.0831 14C14.0831 14.4142 13.7473 14.75 13.3331 14.75H8.66646C8.25225 14.75 7.91646 14.4142 7.91646 14Z"
        fill="#0F1729"
      />
    </svg>
  );
};

export default Edit;
