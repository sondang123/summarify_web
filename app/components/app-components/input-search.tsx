import { Input } from "~/components/ui/input";

export const InputSearch: React.FC = (props) => {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="absolute top-[50%] translate-y-[-50%] left-5"
      >
        <path
          d="M6.45408 6.07487C9.68691 5.91504 12.2022 5.83337 13.9989 5.83337C15.7956 5.83337 18.3109 5.91504 21.5472 6.07487C22.394 6.11716 23.1966 6.46536 23.806 7.0548C24.4154 7.64423 24.7901 8.43482 24.8606 9.27971C25.0087 11.0495 25.0822 12.6082 25.0822 13.9557C25.0822 15.3207 25.0064 16.9004 24.8547 18.697C24.7842 19.532 24.4164 20.3139 23.8182 20.9008C23.2201 21.4876 22.4312 21.8403 21.5951 21.8949C18.8301 22.0757 16.2984 22.1667 14.0001 22.1667C11.7017 22.1667 9.17008 22.0757 6.40508 21.8949C5.56931 21.8401 4.7809 21.4874 4.183 20.9008C3.58511 20.3143 3.21738 19.5328 3.14658 18.6982C3.00418 17.1212 2.9275 15.539 2.91675 13.9557C2.91675 12.6199 2.99141 11.06 3.14191 9.27737C3.2129 8.43291 3.58785 7.64288 4.19719 7.05392C4.80653 6.46497 5.60769 6.11709 6.45408 6.07487Z"
          stroke="#9CA3AF"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <path
          d="M12.25 11.4404V16.5714C12.2503 16.6616 12.2749 16.7501 12.3213 16.8275C12.3678 16.9048 12.4343 16.9682 12.5138 17.0109C12.5933 17.0536 12.6828 17.074 12.773 17.0699C12.8631 17.0659 12.9505 17.0375 13.0258 16.9879L16.8747 14.4446C16.9431 14.399 16.9993 14.3373 17.0383 14.2648C17.0772 14.1924 17.0977 14.1115 17.0979 14.0293C17.0982 13.947 17.0781 13.866 17.0396 13.7933C17.0011 13.7207 16.9452 13.6587 16.877 13.6127L13.0293 11.0251C12.954 10.9745 12.8664 10.9454 12.7758 10.9408C12.6853 10.9362 12.5951 10.9563 12.5151 10.999C12.4351 11.0416 12.3681 11.1052 12.3214 11.183C12.2747 11.2607 12.2501 11.3497 12.25 11.4404Z"
          stroke="#9CA3AF"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
      <Input {...props} className="pl-14 h-[52px]" />
    </div>
  );
};
