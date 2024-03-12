import {
  Checkbox,
  Div,
  FormLayoutGroup,
  OnboardingTooltip,
  Subhead,
  SubnavigationBar,
  SubnavigationButton,
} from "@vkontakte/vkui";
import Styles from "./FiltersBar.module.css";
import { FC, useEffect, useState } from "react";
import { useGroupFiltersStore } from "../../stores/group-store";
import { useOnboardingStore } from "../../stores/onboarding-store";

export interface FiltersBarProps {
  colors: string[];
  privacy: string[];
  friends: string[];
}

export const FiltersBar: FC<FiltersBarProps> = (props: FiltersBarProps) => {
  const [filterValues, setFilterValues] = useState<FiltersBarProps>(props);
  const [nextStepAbility, setNextStepAbility] = useState<boolean>(false);
  const [accentTooltip, setAccentTooltip] = useState<boolean>(true);
  const groupsFiltersStore = useGroupFiltersStore();
  const onboardingStore = useOnboardingStore();
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
          <OnboardingTooltip
            shown={onboardingStore.currentStep === 2}
            placement="top"
            text={"Можно отфильтровать группы по цвету"}
            appearance={accentTooltip ? "accent" : "neutral"}
            onClose={() => {
              if (nextStepAbility) {
                onboardingStore.nextStep();
                setNextStepAbility(false);
              } else {
                let onboardingColors: string[] = [];
                let onboardingColorIndex = 0;
                setFilterValues({
                  ...filterValues,
                  colors: onboardingColors,
                });
                setAccentTooltip(false);
                const interval = setInterval(() => {
                  if (onboardingColorIndex < 3) {
                    onboardingColors.push(props.colors[onboardingColorIndex]);
                    setFilterValues({
                      ...filterValues,
                      colors: onboardingColors,
                    });
                    onboardingColorIndex++;
                  }
                  if (onboardingColorIndex === 3) {
                    console.log(onboardingColorIndex);
                    clearInterval(interval);
                    setFilterValues({
                      ...filterValues,
                      colors: props.colors,
                    });
                    setNextStepAbility(true);
                    setAccentTooltip(true);
                  }
                }, 1000);
              }
            }}
          >
            <Subhead>Цвет аватарки</Subhead>
          </OnboardingTooltip>
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
            <OnboardingTooltip
              shown={onboardingStore.currentStep === 3}
              placement="top"
              text={
                "Если не выбрать ни один цвет, отобразятся группы без аватарки"
              }
              appearance={accentTooltip ? "accent" : "neutral"}
              onClose={() => {
                if (nextStepAbility) {
                  onboardingStore.nextStep();
                  setNextStepAbility(false);
                } else {
                  setAccentTooltip(false);
                  let onboardingColors: string[] = [];
                  setFilterValues({
                    ...filterValues,
                    colors: onboardingColors,
                  });
                  const timeout = setTimeout(() => {
                    setFilterValues({
                      ...filterValues,
                      colors: props.colors,
                    });
                    setNextStepAbility(true);
                    setAccentTooltip(true);
                    clearInterval(timeout);
                  }, 1500);
                }
              }}
            >
              <Checkbox
                checked={filterValues.colors.length === props.colors.length}
                value={"all"}
                name="colors"
                onChange={checkboxHandler}
              >
                Все
              </Checkbox>
            </OnboardingTooltip>
          </Div>
        </Div>
        <FormLayoutGroup>
          <OnboardingTooltip
            shown={onboardingStore.currentStep === 4}
            text={"Также доступна фильтрация групп по приватности..."}
            appearance={accentTooltip ? "accent" : "neutral"}
            placement="top"
            onClose={() => {
              if (nextStepAbility) {
                onboardingStore.nextStep();
                setNextStepAbility(false);
              } else {
                let onboardingPrivacy: string[] = ["true"];
                setFilterValues({
                  ...filterValues,
                  privacy: onboardingPrivacy,
                });
                setAccentTooltip(false);
                const timeout = setTimeout(() => {
                  setFilterValues({
                    ...filterValues,
                    privacy: props.privacy,
                  });
                  setNextStepAbility(true);
                  setAccentTooltip(true);
                  clearInterval(timeout);
                }, 1500);
              }
            }}
          >
            <Subhead>Тип приватности</Subhead>
          </OnboardingTooltip>
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
          <OnboardingTooltip
            shown={onboardingStore.currentStep === 5}
            text={"И наличию друзей"}
            appearance={accentTooltip ? "accent" : "neutral"}
            placement="top"
            onClose={() => {
              if (nextStepAbility) {
                onboardingStore.nextStep();
                setNextStepAbility(false);
              } else {
                let onboadringFriends: string[] = ["true"];
                setFilterValues({
                  ...filterValues,
                  friends: onboadringFriends,
                });
                setAccentTooltip(false);
                const timeout = setTimeout(() => {
                  setFilterValues({
                    ...filterValues,
                    friends: props.friends,
                  });
                  setNextStepAbility(true);
                  setAccentTooltip(true);
                  clearInterval(timeout);
                }, 1500);
              }
            }}
          >
            <Subhead>Наличие друзей</Subhead>
          </OnboardingTooltip>
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
