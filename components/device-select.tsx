import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

import { devices } from "../constants";

type Props = {
  startDevice?: string;
  startSensor?: string;
  onChange: (device: string, sensor: string) => void;
};

export const DeviceSelect = ({ startDevice, startSensor, onChange }: Props) => {
  const [device, setDevice] = useState<string>(Object.keys(devices)[0]);
  const [sensor, setSensor] = useState<string | null>(null);

  const onFinalSelect = (newSensor: string) => {
    setSensor(newSensor);
    onChange(device, newSensor);
  };

  useEffect(() => {
    if (startDevice) setDevice(startDevice);
    if (startSensor) setSensor(startSensor);
  }, [startDevice, startSensor]);

  return (
    <>
      <Box marginTop={2}>
        <FormControl fullWidth>
          <Typography>Device</Typography>
          <Select value={device} onChange={(e) => setDevice(e.target.value)}>
            {Object.keys(devices).map((key) => {
              return (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {device && (
        <Box marginTop={2}>
          <FormControl fullWidth>
            <Typography>Sensor</Typography>
            <Select
              value={sensor}
              onChange={(e) => onFinalSelect(e.target.value)}
            >
              {devices[device].sensors.map(({ name }) => {
                return (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
    </>
  );
};
