import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch("https://nareshprajapati9313.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "28rem" }}>
        <h2 className="text-center mb-4">Create an Account</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "User",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger mt-1"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Role</label>
              <Field as="select" name="role" className="form-control">
                <option value="User">User</option>
                <option value="Organization">Organization</option>
              </Field>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Register
            </button>
          </Form>
        </Formik>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-primary fw-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
