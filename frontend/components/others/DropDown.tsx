import React, { useState } from 'react';
import { ChevronDownArrowSVG } from '../svg/other/ChevronDownArrow';
import { ChevronUpArrowSVG } from '../svg/other/ChevronUpArrow';
import dropDownStyles from '../../styles/components/DropDown.module.scss';

type DropDownProps = {
  title: string;
  children: React.ReactNode;
  wrapperClassName?: string;
  headingClassName?: string;
  upArrowIcon?: React.ReactNode;
  downArrowIcon?: React.ReactNode;
};

export const DropDown = ({
  title,
  children,
  wrapperClassName,
  headingClassName,
  upArrowIcon = <ChevronUpArrowSVG />,
  downArrowIcon = <ChevronDownArrowSVG />,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${wrapperClassName} ${dropDownStyles.wrapper}`}>
      <button
        className={`${headingClassName} ${dropDownStyles.text}`}
        type="button"
        onClick={onClickHandler}
      >
        <p className={dropDownStyles.title}>{title}</p>
        {isOpen ? (
          <span className={`${dropDownStyles.arrow} ${headingClassName}`}>
            {upArrowIcon}
          </span>
        ) : (
          <span className={`${dropDownStyles.arrow} ${headingClassName}`}>
            {downArrowIcon}
          </span>
        )}
      </button>

      {isOpen && children}
    </div>
  );
};
export default DropDown;
