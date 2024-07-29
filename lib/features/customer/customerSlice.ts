import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";

export interface ICustomer {
  id: number;
  name: string;
  mobileNumber: number;
  email: string;
  designation: string;
  gender: string;
  course: string;
  countryCode: number;
  userId: number;
  image: string;
}

export interface IInitialState {
  customer?: ICustomer;
  error?: any;
  loading?: boolean;
}
const initialState: IInitialState = {
  customer: undefined,
  error: null,
  loading: false,
};

const formatError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    return (
      message || {
        non_field_error: "Something went worng",
      }
    );
  } else {
    // Handle other types of errors
    return {
      non_field_error: "Something went worng",
    };
  }
};

export const customerAsync = createAsyncThunk<ICustomer>(
  "customer/get",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.user?.token; // Access the token from auth slice
      if (!token) {
        throw new Error("No token found");
      }
      // const token = "2Nbn09t2CLUqBtNTiDzY"; // Replace with your actual token
      const response = await axios.get("http://localhost:3001/customer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "inside customerAsync");
      return response.data as ICustomer[];
    } catch (error) {
      console.log(error, "async error");
      return formatError(error);
    }
  }
);

export const createCustomerAsync = createAsyncThunk<ICustomer, ICustomer>(
  "customer/create",
  async (customerData, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.user?.token; // Access the token from auth slice

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        "http://localhost:3001/customer",
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response, "inside createCustomerAsync");
      return response.data as ICustomer;
    } catch (error) {
      console.log(error, "async error");
      return rejectWithValue(formatError(error));
    }
  }
);

export const updateCustomerAsync = createAsyncThunk<ICustomer, ICustomer>(
  "customer/update",
  async (customerData, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.user?.token; // Access the token from auth slice

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        `http://localhost:3001/customer/${customerData.id}`,
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response, "inside updateCustomerAsync");
      return response.data as ICustomer;
    } catch (error) {
      console.log(error, "async error");
      return rejectWithValue(formatError(error));
    }
  }
);

// export const removeCustomerAsync = createAsyncThunk(
//   "customer/removeCustomer",
//   async (customerId, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/api/customers/${customerId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(formatError(error));
//     }
//   }
// );
export const removeCustomerAsync = createAsyncThunk(
  "customer/removeCustomer",
  async (customerId, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.user?.token; // Access the token from auth slice

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.delete(
        `http://localhost:3001/customer/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return customerId;
    } catch (error) {
      return rejectWithValue(formatError(error));
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(customerAsync.pending, (state) => {
        // state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(
        customerAsync.fulfilled,
        (state, action: PayloadAction<ICustomer>) => {
          console.log(action);
          state.customer = action.payload;
          state.loading = false;
        }
      )
      .addCase(customerAsync.rejected, (state, action) => {
        // state.status = "idle"
        // console.log(action);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCustomerAsync.fulfilled,
        (state, action: PayloadAction<ICustomer>) => {
          console.log(action);
          state.customer = [...state.customer, action.payload];
          state.loading = false;
        }
      )
      .addCase(createCustomerAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCustomerAsync.fulfilled,
        (state, action: PayloadAction<ICustomer>) => {
          console.log(action);
          state.customer = state.customer.map((customer) =>
            customer.id === action.payload.id ? action.payload : customer
          );
          state.loading = false;
        }
      )
      .addCase(updateCustomerAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeCustomerAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.customer = state.customer.filter(
            (customer) => customer.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(removeCustomerAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function

export default customerSlice.reducer; // EXPORT Slice reducer
