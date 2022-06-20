import { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from '@mui/material';

const Agenda = () => {
  const [firstName, setFritsName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const addContact = () => {
    if (!firstName || !phoneNumber) {
      setError('You must fill all the values');
      return;
    }

    const newContact = {
      name: firstName,
      phoneNumber: phoneNumber,
    };

    setFritsName('');
    setPhoneNumber('');

    setContacts([...contacts, newContact]);
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(contacts.map((contact) => contact.phoneNumber));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const onChange = (fieldType, value) => {
    switch (fieldType) {
      case 'Name':
        if (error && phoneNumber) {
          setError('');
        }
        setFritsName(value);
        break;
      case 'Phone':
        if (error && firstName) {
          setError('');
        }
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const deleteContacts = () => {
    if (isCheckAll) {
      setContacts([]);
      setIsCheckAll(false);
    } else if (isCheck.length > 0) {
      setIsCheck([]);
      setContacts(contacts.filter((value) => !isCheck.includes(value.phoneNumber)));
    }
  };

  return (
    <Paper style={{ maxWidth: '650px', backgroundColor: 'light-blue', padding: 32, margin: 32 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="First name"
            placeholder="First name"
            type="text"
            value={firstName}
            onChange={(e) => onChange('Name', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone number"
            placeholder="Phone number"
            type="text"
            value={phoneNumber}
            onChange={(e) => onChange('Phone', e.target.value)}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <p style={{ color: 'red' }}>{error}</p>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button disabled={!!error} variant="contained" onClick={addContact}>
            Add contact
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          name="selectAll"
                          id="selectAll"
                          onClick={handleSelectAll}
                          checked={isCheckAll}
                        />
                      </TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Phone Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contacts?.map((contact) => (
                      <TableRow key={contact.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          <Checkbox
                            name={contact.name}
                            id={contact.phoneNumber}
                            onClick={handleClick}
                            checked={isCheck.includes(contact.phoneNumber)}
                          />
                        </TableCell>
                        <TableCell align="right">{contact.name}</TableCell>
                        <TableCell align="right">{contact.phoneNumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {(isCheck.length > 0 || isCheckAll) && (
              <Grid item xs>
                <Button onClick={deleteContacts} variant="contained" color="error">
                  Delete
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { Agenda };
