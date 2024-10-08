import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Snackbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getErrors, getImage } from './helpers';
import {
  InputErrors,
  InputName,
  InputRefs,
  InputValues,
} from './types';
import { IPartnersArticle } from '@app/types';
import {
  addPartnerArticle,
  deletePartnerArticle,
  getPartnerArticle,
  updatePartnerArticle,
  uploadFile,
} from '@app/API';

export const AdminArticleItem: FC = () => {
  const { id }: { id?: string } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<
    string | null
  >(null);
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  });
  const [inputValues, setInputValues] = useState<InputValues>({
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    getPartnerArticle(id).then((data) =>
      setInputValues({
        'company-name': data['company-name'],
        title: data.title,
        description: data.description,
        text: data.text,
        image: data.image,
      })
    );
  }, [id]);

  const open = Boolean(anchorEl);
  const inputRefs: InputRefs = {
    'company-name': useRef<HTMLInputElement>(),
    title: useRef<HTMLInputElement>(),
    description: useRef<HTMLTextAreaElement>(),
    text: useRef<HTMLTextAreaElement>(),
    image: useRef<HTMLInputElement>(),
  };
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const closeSnackbar = () => {
    setSnackbarMessage(null);
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const deleteArticle = async () => {
    if (!id) {
      return;
    }
    deletePartnerArticle(id)
      .then(() => {
        setSnackbarMessage('✅ Статья удалена');
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      })
      .catch((error) => {
        setSnackbarMessage(`❌ ${error.message}`);
      });
  };

  const submitting = async (
    promise: Promise<any>,
    message: string
  ) => {
    return promise
      .then(() => {
        setSnackbarMessage(message);
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      })
      .catch((error) => {
        setSnackbarMessage(`❌ ${error.message}`);
      });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 1. Собрать данные
    const data = new FormData();
    Object.entries(inputValues).forEach(([name, value]) => {
      data.append(name, value);
    });
    // 2. Проверить данные
    const errors = await getErrors(
      Array.from(data.entries()) as [InputName, FormDataEntryValue][]
    );
    const errorsEntries = Object.entries(errors);
    // 3.1 Подсветить ошибки
    setInputErrors(errors);
    // 3.2 Сфокусироваться на первом ошибочном инпуте
    const errorInput = errorsEntries.find(
      ([, value]) => value.length > 0
    );
    if (errorInput) {
      const name = errorInput[0] as InputName;
      const inputRef = inputRefs[name];
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    // 4. Если все ок, отправить данные
    if (id) {
      // editing
      submitting(
        updatePartnerArticle(id, inputValues),
        '✅ Статья обновлена'
      );
    } else {
      // creating
      submitting(
        addPartnerArticle(
          inputValues as Omit<IPartnersArticle, 'id' | 'created'>
        ),
        '✅ Статья создана'
      );
    }
  };

  const showFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files === null || !files.length) {
      return;
    }
    const file = files[0];
    if (file.size === 0 || !file.type.startsWith('image/')) {
      return;
    }
    const image = await getImage(file);
    if (image.width < 200 || image.height < 200) {
      setInputErrors({
        ...inputErrors,
        image: 'Изображение должно быть минимум 200x200',
      });
      return;
    }
    try {
      const url = await uploadFile(file);
      setInputValues({
        ...inputValues,
        image: url,
      });
    } catch (error: any) {
      setSnackbarMessage(`❌ ${error.message}`);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={onSubmit}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Typography variant="h4" gutterBottom>
            {id
              ? `Редактирование статьи «${inputValues.title}»`
              : 'Новая статья'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ mr: 1 }}
            >
              Сохранить
            </Button>

            {id && (
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={deleteArticle}>
                    Удалить статью
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Компания"
                variant="outlined"
                name="company-name"
                value={inputValues['company-name']}
                onChange={onChangeInput}
                inputRef={inputRefs['company-name']}
                error={Boolean(inputErrors['company-name'].length)}
                helperText={inputErrors['company-name']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Название статьи"
                variant="outlined"
                name="title"
                value={inputValues.title}
                onChange={onChangeInput}
                inputRef={inputRefs.title}
                error={Boolean(inputErrors.title.length)}
                helperText={inputErrors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                label="Подводка"
                variant="outlined"
                name="description"
                value={inputValues.description}
                onChange={onChangeInput}
                inputRef={inputRefs.description}
                error={Boolean(inputErrors.description.length)}
                helperText={inputErrors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={12}
                label="Текст"
                variant="outlined"
                name="text"
                value={inputValues.text}
                onChange={onChangeInput}
                inputRef={inputRefs.text}
                error={Boolean(inputErrors.text.length)}
                helperText={inputErrors.text}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          <Card>
            <CardActionArea>
              <CardMedia
                sx={{ maxHeight: 550, overflow: 'hidden' }}
                component="img"
                height="140"
                image={inputValues.image}
              />
              <CardContent>
                <TextField
                  type="file"
                  name="image"
                  fullWidth={true}
                  variant="outlined"
                  onChange={showFile}
                  ref={inputRefs.image}
                  error={Boolean(inputErrors.image.length)}
                  helperText={inputErrors.image}
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: 14, // Размер шрифта
                    },
                    '.MuiInputBase-input': {
                      minHeight: '50px',
                    },
                    width: '100%', // Ширина компонента
                    margin: 'auto', // Центрирование
                  }}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={typeof snackbarMessage === 'string'}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};
