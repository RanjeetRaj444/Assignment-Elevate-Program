import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getBooks, saveBooks } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const schema = Yup.object().shape({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
  genre: Yup.string().required("Required"),
  price: Yup.number()
    .required("Required")
    .moreThan(0, "Must be greater than 0"),
});
let options = [
  { value: "Fiction", label: "Fiction" },
  { value: "Non-Fiction", label: "Non-Fiction" },
  { value: "Biography", label: "Biography" },
  { value: "Thriller", label: "Thriller" },
];

function AddBookPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add New Book
        </h1>
        <Formik
          initialValues={{
            title: "",
            author: "",
            genre: "",
            price: "",
            description: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            const newBook = {
              ...values,
              id: uuid(),
              price: Number(values.price),
            };
            const allBooks = [...getBooks(), newBook];
            saveBooks(allBooks);
            navigate("/");
          }}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="title"
                placeholder="Title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="author"
                placeholder="Author"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="genre"
                as="select"
              >
                <option value="">Select a genre</option>
                {options.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="genre"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="price"
                type="number"
                placeholder="Price"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="description"
                placeholder="Description (optional)"
              />
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
              type="submit"
            >
              Add Book
            </button>
          </Form>
        </Formik>
        <button
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
          onClick={() => navigate("/")}
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

export default AddBookPage;
