import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Button } from "../common/Button";
import Checkbox from "../common/Checkbox";

import { usePrevious } from "../../hooks/usePrevious";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import { isObjectSame } from "../../utils/object";

export interface IFilterBoxItem {
	label: string | React.ReactNode;
	key: string;
}

interface IProps {
	defaultSelectedItems?: string[];
	filterItems?: IFilterBoxItem[];
	isOpen: boolean;
	isReset: boolean;
	iconRef: React.MutableRefObject<null>;
	onFilter?: (keys: string[]) => void;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsReset: Dispatch<SetStateAction<boolean>>;
}

const FilterDropdown: FC<IProps> = ({
	isOpen,
	isReset,
	filterItems,
	defaultSelectedItems = [],
	iconRef,
	onFilter,
	setIsOpen,
	setIsReset,
}) => {
	const previousSelectedItems = usePrevious(defaultSelectedItems);

	const [selectedItems, setSelectedItems] = useState(defaultSelectedItems);
	const [isAllChecked, setIsAllChecked] = useState(
		() => !!(defaultSelectedItems.length === filterItems?.length)
	);

	const dropdownRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(() => {
		handleCancel();
	}, [iconRef, dropdownRef]);

	useEffect(() => {
		if (!filterItems) return;

		if (isOpen && defaultSelectedItems.length === filterItems?.length) {
			setIsAllChecked(true);
		}
	}, [isOpen, defaultSelectedItems.length, filterItems?.length, filterItems]);

	const handleSetIsActive = () => {
		if (!filterItems) return;

		setIsAllChecked((prev) => {
			const nextState = !prev;
			const nextSelectedItems = nextState ? filterItems.map(({ key }) => key) : [];

			setSelectedItems(nextSelectedItems);
			return !prev;
		});
	};

	const handleItemCheck = (item: IFilterBoxItem, shouldBeNextValue: boolean) => {
		if (!filterItems) return;

		setSelectedItems((prev) => {
			let newSelectedItems: string[] = [];

			if (shouldBeNextValue) {
				newSelectedItems = [...prev, item.key];
			} else {
				newSelectedItems = prev.filter((key) => key !== item.key);
			}

			const shouldCheckAll = newSelectedItems.length === filterItems.length;

			setIsAllChecked(shouldCheckAll);

			return newSelectedItems;
		});
	};

	const handleCancel = useCallback(() => {
		onFilter && setSelectedItems(defaultSelectedItems);

		setIsOpen(false);
		setIsReset(false);
	}, [defaultSelectedItems, onFilter, setIsOpen, setIsReset]);

	const handleApply = useCallback(() => {
		onFilter && onFilter(selectedItems);

		setIsOpen(false);
	}, [onFilter, selectedItems, setIsOpen]);

	useEffect(() => {
		if (!previousSelectedItems) {
			return;
		}

		const isSame = isObjectSame(previousSelectedItems, defaultSelectedItems);
		if (!isSame) {
			setSelectedItems(defaultSelectedItems);
		}
	}, [defaultSelectedItems, previousSelectedItems]);

	useEffect(() => {
		if (isReset) {
			handleCancel();
		}
	}, [isReset, handleCancel]);

	return (
		<DropdownContainer ref={dropdownRef} className={`${!isOpen ? "hidden" : ""}`}>
			{filterItems && (
				<FilterBox>
					<Item>
						<Checkbox
							id="all"
							name="all"
							width="14px"
							height="14px"
							checked={isAllChecked}
							onChange={handleSetIsActive}
						/>
						<p>All</p>
					</Item>

					{filterItems.map((item) => {
						const isChecked = selectedItems.includes(item.key);

						return (
							<Item key={item.key}>
								<Checkbox
									id={item.key}
									name={item.key}
									width="14px"
									height="14px"
									checked={isChecked}
									onChange={() => handleItemCheck(item, !isChecked)}
								/>
								<p>{item.label}</p>
							</Item>
						);
					})}
				</FilterBox>
			)}
			<ButtonWrapper>
				<Button type="button" style={{ padding: "4px 10px", fontSize: "14px" }} onClick={handleApply}>
					Apply
				</Button>
				<Button type="button" style={{ padding: "4px 10px", fontSize: "14px" }} onClick={handleCancel}>
					Cancel
				</Button>
			</ButtonWrapper>
		</DropdownContainer>
	);
};

export default FilterDropdown;

const DropdownContainer = styled.div`
	position: absolute;
	top: 100%;
	z-index: 1;
	width: 200px;
	padding: 8px;
	border-radius: 3px;
	background-color: #fff;
	border: 1px solid #ccc;
`;

const FilterBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 4px 0;
	border-bottom: 1px solid #4c758b;
`;

const Item = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 8px;
	font-size: 14px;
	font-weight: 400;
`;

const ButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	padding-top: 8px;
`;
