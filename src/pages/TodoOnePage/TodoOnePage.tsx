import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
  sleep,
} from "react-declarative";
import jsonp from "jsonp";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";
import { Email } from "@mui/icons-material";

interface ITodoOnePageProps {
  id: string;
}

const fields: TypedField[] = [
  {
    type: FieldType.Div,
    style: {
      padding: "5px 50px",
      display: "grid",
      gridTemplateColumns: "200px auto",
      gap: "5px",
    },
    fields: [
      {
        type: FieldType.Group,
        // /images
        fields: [
          {
            type: FieldType.Box,
            style: {
              height: "200px",
              backgroundColor: "#3c3c3c",
              borderRadius: "10px",
            },
          },
          {
            //rate
            type: FieldType.Rating,
          },
        ],
      },
      {
        type: FieldType.Group,
        fields: [
          //line for Profile
          {
            type: FieldType.Line,
            title: "Profile",
          },
          //// male | female
          {
            type: FieldType.Combo,
            name: "gender",
            title: "Gender",
            async itemList() {
              await sleep(1e3);
              return [
                "male-unique-key",
                "female-unique-key",
                "other-unique-key",
              ];
            },
            async tr(current) {
              await sleep(5e2);
              if (current === "male-unique-key") {
                return "Male";
              } else if (current === "female-unique-key") {
                return "Female";
              } else if (current === "other-unique-key") {
                return "Other";
              } else {
                return "";
              }
            },
            defaultValue: "their-unique-key",
          },
          //however I don't understand how this will work
          {
            type: FieldType.Items,
            title: "List",
          },
          // this div for keyyword db.json
          {
            type: FieldType.Div,
            style: {
              padding: "5px 50px",
              display: "grid",
              gridTemplateColumns: "auto 200px",
            },

            fields: [
              {
                type: FieldType.Text,
                title: "keywords",
                defaultValue: "keyword",
                name: "keyword",
                outlined: false,
              },
              {
                type: FieldType.Checkbox,
                fieldBottomMargin: "0",
                name: "subscribed",
                title: "passphrase",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    type: FieldType.Div,
    style: {
      padding: "5px 50px",
    },
    fields: [
      {
        type: FieldType.Line,
        title: "Common info",
      },

      //names
      {
        type: FieldType.Text,
        title: "First name",
        defaultValue: "Asadullo",
        description: "Your first name",
        name: "firstName",
      },

      //last name
      {
        type: FieldType.Text,
        title: "Last name",
        defaultValue: "Nazarov",
        description: "Your last name",
        name: "lastName",
      },

      //age
      {
        type: FieldType.Text,
        inputType: "number",
        title: "Age",
        defaultValue: "21",
        description: "47",
        name: "age",
      },

      ///folowers

      {
        type: FieldType.Expansion,
        title: "Folowers",
        description: "notification subscription",
        fields: [
          {
            type: FieldType.Text,
            title: "phoneNumber",
            description: "asadullon768@gmail.com",
            name: "email",
            defaultValue: true,
          },
          {
            type: FieldType.Text,
            title: "phoneNumber",
            description: "+998909327526",
            name: "phonenumber",
          },
        ],
      },
    ],
  },

  {
    type: FieldType.Div,
    style: {
      padding: "5px 50px",
      display: "grid",
      gridTemplateColumns: "auto auto",
      gap: "5px",
    },

    fields: [
      {
        type: FieldType.Group,
        fields: [
          {
            type: FieldType.Line,
            title: "Work",
          },
          {
            type: FieldType.Text,
            title: "Job title",
            defaultValue: "SMM",
            name: "jobTitle",
          },
          {
            type: FieldType.Text,
            title: "place of work",
            defaultValue: "SMM",
            name: "jobArea",
          },
        ],
      },
      {
        type: FieldType.Group,
        fields: [
          {
            type: FieldType.Line,
            title: "Home Adress",
          },
          {
            type: FieldType.Text,
            title: "country",
            defaultValue: "Uzb",
            name: "country",
          },
          {
            type: FieldType.Text,
            title: "city",
            defaultValue: "Tashkent",
            name: "city",
          },
          {
            type: FieldType.Text,
            title: "state",
            defaultValue: "Andijan",
            name: "state",
          },
          {
            type: FieldType.Text,
            title: "address",
            defaultValue: "Yakkasaray district",
            name: "address",
          },
        ],
      },
    ],
  },
];

export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [fetchApi<ITodoItem>(`/users/${id}`)] as const;

  // const Content = (props: any) => {
  //   const { data, oneProps, beginSave } = usePreventLeave({
  //     history,
  //     onSave: () => {
  //       alert(JSON.stringify(data, null, 2));
  //       return true;
  //     },
  //   });

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        // Ваши действия перед сохранением данных

        // Создаем объект данных, который вы хотите отправить на сервер
        const requestData = {
          // Пример данных, которые могут быть отправлены
          name: data.name,
          email: data.email,
          // Другие поля данных
        };

        // URL-адрес сервера для JSONP-запроса
        const serverUrl = "http://localhost:8080/db";

        // Выполняем JSONP-запрос
        jsonp(
          serverUrl,
          { param: "callback", timeout: 5000 },
          (err: any, response: any) => {
            if (err) {
              console.error("Error in the request", err);
              alert("Error in the save on the server.");
            } else {
              console.log("Saved", response);

              // Ваши действия после успешного сохранения
              alert("Saved on the base.");
            }
          }
        );

        // Возвращаем true, чтобы разрешить покидание страницы
        return true;
      },
    });
    return (
      <>
        <Breadcrumbs
          withSave
          title="Users"
          subtitle={props.todo.title}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
