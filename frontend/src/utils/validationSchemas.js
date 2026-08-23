
import * as Yup from "yup";

export const getLoginSchema = (t) => {
  return Yup.object({
    email: Yup.string()
      .email(t("val_email", "Неверный формат email"))
      .required(t("val_required", "Обязательное поле")),
    password: Yup.string()
      .min(6, t("val_pass_min", "Пароль должен содержать минимум 6 символов"))
      .required(t("val_required", "Обязательное поле")),
  });
};

export const getRegisterSchema = (t) => {
  return Yup.object({
    name: Yup.string()
      .min(2, t("val_name_min", "Имя слишком короткое"))
      .max(50, t("val_name_max", "Имя слишком длинное"))
      .required(t("val_required", "Обязательное поле")),
    email: Yup.string()
      .email(t("val_email", "Неверный формат email"))
      .required(t("val_required", "Обязательное поле")),
    password: Yup.string()
      .min(6, t("val_pass_min", "Пароль должен содержать минимум 6 символов"))
      .required(t("val_required", "Обязательное поле")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("val_pass_match", "Пароли должны совпадать"),
      )
      .required(t("val_required", "Обязательное поле")),
  });
};