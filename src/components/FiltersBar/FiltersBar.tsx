import {
  Checkbox,
  Div,
  FormLayoutGroup,
  Subhead,
  SubnavigationBar,
  SubnavigationButton,
} from "@vkontakte/vkui";
import Styles from "./FiltersBar.module.css";
import { FC, useEffect, useState } from "react";
import { useGroupFiltersStore } from "../../stores/group-store";

export interface FiltersBarProps {
  colors: string[];
  privacy: string[];
  friends: string[];
}

export const FiltersBar: FC<FiltersBarProps> = (props: FiltersBarProps) => {
  const [filterValues, setFilterValues] = useState<FiltersBarProps>(props);
  const groupsFiltersStore = useGroupFiltersStore();
  useEffect(() => {
    groupsFiltersStore.filter(filterValues);
  }, [filterValues]);

  const buttonAllHandler = () => {
    setFilterValues({ ...filterValues, privacy: props.privacy });
  };
  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkBoxValue = event.target.value;

    if (checkBoxValue === "all") {
      if (!event.target.checked) {
        setFilterValues({ ...filterValues, [event.target.name]: [] });
      } else {
        setFilterValues({
          ...filterValues,
          [event.target.name]: [
            ...props[event.target.name as keyof FiltersBarProps],
          ],
        });
      }
      return;
    }

    if (!event.target.checked) {
      setFilterValues({
        ...filterValues,
        [event.target.name]: filterValues[
          event.target.name as keyof FiltersBarProps
        ].filter((value) => value !== checkBoxValue),
      });
    } else {
      setFilterValues({
        ...filterValues,
        [event.target.name]: [
          ...filterValues[event.target.name as keyof FiltersBarProps],
          checkBoxValue,
        ],
      });
    }
  };

  return (
    <SubnavigationBar>
      <Div className={Styles.ColorWrapper}>
        <Div style={{ padding: 0 }}>
          <Subhead>Цвет аватарки</Subhead>
          <Div className={Styles.ColorWrapper}>
            {props.colors.map((color, index) => {
              if (!color) return <></>;
              return (
                <Checkbox
                  checked={filterValues.colors.includes(color)}
                  key={index}
                  value={color}
                  name="colors"
                  onChange={checkboxHandler}
                >
                  <div
                    style={{
                      backgroundColor: color,
                    }}
                    className={Styles.CheckboxColor}
                  ></div>
                </Checkbox>
              );
            })}
            <Checkbox
              checked={filterValues.colors.length === props.colors.length}
              value={"all"}
              name="colors"
              onChange={checkboxHandler}
            >
              Все
            </Checkbox>
          </Div>
        </Div>
        <FormLayoutGroup>
          <Subhead>Тип приватности</Subhead>
          <Div>
            {props.privacy.map((privacyItem, index) => {
              return (
                <Checkbox
                  checked={filterValues.privacy.includes(privacyItem)}
                  name="privacy"
                  key={index}
                  value={privacyItem.toString()}
                  onChange={checkboxHandler}
                >
                  <span>
                    {privacyItem === "true" ? "Закрытые" : "Открытые"}
                  </span>
                </Checkbox>
              );
            })}

            <SubnavigationButton
              checked={filterValues.privacy.length === props.privacy.length}
              value={"all"}
              name="privacy"
              onClick={buttonAllHandler}
            >
              Все
            </SubnavigationButton>
          </Div>
        </FormLayoutGroup>
        <FormLayoutGroup>
          <Subhead>Наличие друзей</Subhead>
          <Div>
            <Checkbox
              checked={filterValues.friends.includes("true")}
              value={"true"}
              name="friends"
              onChange={checkboxHandler}
            >
              В группе должны быть друзья
            </Checkbox>
          </Div>
        </FormLayoutGroup>
      </Div>
    </SubnavigationBar>
  );
};
