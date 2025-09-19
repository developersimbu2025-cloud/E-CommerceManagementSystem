import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../component/ui/label";
import Input from "../component/ui/input";
import Button from "../component/ui/button";
import { Validation } from "../data/Validation";
import { loginSuccess, setLoading } from "../store/slices/authSlice.ts";
import { useAppDispatch } from "../store/hooks";
type LoginFormType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = Validation(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      dispatch(setLoading(true));

      setTimeout(() => {
        dispatch(
          loginSuccess({
            id: "1",
            email: formData.email,
            name: formData.email.split("@")[0],
          })
        );
        navigate("/");
      }, 1000);
    },
    [formData, Validation, dispatch, navigate]
  );

  return (
    <div className="min-h-screen bg-[#0d61fd] flex items-center justify-center">
      {/* Login Form */}
      <div className="w-full max-w-md bg-white p-5 border border-[#e5e7eb] shadow">
        <div className="flex flex-col items-center justify-center p-6">
          <div className="text-2xl font-semibold">Sign In</div>
          <div className="text-[#847062] mt-3">
            Enter your credentials to access your account
          </div>
        </div>
        <form onClick={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" text="Email Address" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password" text="Password" />
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full text-white bg-[#0d61fd]">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Create one here
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-[#f2ebe3] rounded-lg">
          <p className="text-sm font-medium text-foreground mb-2">
            Demo Credentials:
          </p>
          <p className="text-xs text-muted-foreground">
            Email: admin@123.com
            <br />
            Password: Any password will work
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
