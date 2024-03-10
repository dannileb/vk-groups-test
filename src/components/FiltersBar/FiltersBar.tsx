import {
  Checkbox,
  Div,
  FormLayoutGroup,
  Subhead,
  SubnavigationBar,
} from "@vkontakte/vkui";
import Styles from "./FiltersBar.module.css";
import { FC, useEffect, useState } from "react";

interface FiltersBarProps {
  colors: string[];
  privacy: string[];
}
export const FiltersBar: FC<FiltersBarProps> = ({ colors, privacy }) => {
  const [filterValues, setFilterValues] = useState<FiltersBarProps>({
    colors,
    privacy,
  });
  useEffect(() => {
    console.log(filterValues);
  }, [filterValues]);
  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkBoxValue = event.target.value;
    if (checkBoxValue === "all") {
      if (!event.target.checked) {
        setFilterValues({ ...filterValues, [event.target.name]: [] });
      } else {
        switch (event.target.name) {
          case "colors":
            setFilterValues({
              ...filterValues,
              colors: colors,
            });
            break;
          case "privacy":
            setFilterValues({
              ...filterValues,
              privacy: [...privacy],
            });
            break;

          default:
            break;
        }
      }
      return;
    }

    if (!event.target.checked) {
      switch (event.target.name) {
        case "colors":
          setFilterValues({
            ...filterValues,
            colors: colors.filter((value) => value !== checkBoxValue),
          });
          break;
        case "privacy":
          setFilterValues({
            ...filterValues,
            privacy: privacy.filter((value) => value !== checkBoxValue),
          });
          break;

        default:
          break;
      }
    } else {
      switch (event.target.name) {
        case "colors":
          setFilterValues({
            ...filterValues,
            [event.target.name]: [
              ...filterValues[event.target.name],
              checkBoxValue,
            ],
          });
          break;
        case "privacy":
          setFilterValues({
            ...filterValues,
            privacy: [...filterValues.privacy, checkBoxValue],
          });
          break;

        default:
          break;
      }
    }
  };

  return (
    <SubnavigationBar>
      <Div className={Styles.ColorWrapper}>
        <Div style={{ padding: 0 }}>
          <Subhead className={Styles.Subhead}>Цвет аватарки</Subhead>
          <Div className={Styles.ColorWrapper}>
            {colors.map((color, index) => {
              return (
                <Checkbox
                  checked={filterValues.colors.includes(color)}
                  key={index}
                  value={color}
                  name="colors"
                  onChange={checkboxHandler}
                >
                  {color === "all" ? (
                    <span>Все</span>
                  ) : (
                    <div
                      style={{
                        backgroundColor: color,
                      }}
                      className={Styles.CheckboxColor}
                    ></div>
                  )}
                </Checkbox>
              );
            })}
          </Div>
        </Div>
        <FormLayoutGroup>
          <Subhead className={Styles.Subhead}>Тип приватности</Subhead>
          {privacy.map((privacyItem, index) => {
            return (
              <Checkbox
                checked={filterValues.privacy.includes(privacyItem)}
                name="privacy"
                key={index}
                value={privacyItem.toString()}
                onChange={checkboxHandler}
              >
                <span>
                  {privacyItem === "all"
                    ? "Все"
                    : privacyItem === "false"
                    ? "Закрытые"
                    : "Открытые"}
                </span>
              </Checkbox>
            );
          })}
        </FormLayoutGroup>
        <FormLayoutGroup>
          <Subhead className={Styles.Subhead}>Наличие друзей</Subhead>
          <Checkbox value={"false"} onClick={() => {}}>
            В группе должны быть друзья
          </Checkbox>
        </FormLayoutGroup>
      </Div>
    </SubnavigationBar>
  );
};
