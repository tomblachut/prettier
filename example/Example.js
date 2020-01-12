import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Example = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    setName("Tomasz");
  }, []);
  const countries = useSelector(state => state.countries);
  const cities = useSelector(state => state.cities);
  return <div />;
};
