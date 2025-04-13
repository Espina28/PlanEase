import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Navbar from "../../Components/Navbar";
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import NavPanel from "../../Components/subcon-navpanel";
import '../../index.css';
import { Box, IconButton, Modal, Stack, TextField, Button } from '@mui/material';

const SubcontractorDashboard = () => {
  // State for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State for showcase items
  const [itemData, setItemData] = useState([]);

  const [selectedImage, setSelectedImage] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImage((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = () => {
    // Add new item to itemData
    const newItem = {
      title,
      description,
      selectedImage: selectedImage.map((img) => ({
        image: img.image,
        title: img.title,
      })),
    };
    setItemData((prev) => [...prev, newItem]);
  
    // Reset form fields
    setTitle('');
    setDescription('');
    setSelectedImage([]);
  
    handleClose();
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files).map((file) => ({
      title: file.name,
      image: URL.createObjectURL(file),
      file,
    }));
    setSelectedImage((prev) => [...prev, ...imageArray]); // Append to current state
  };

  // Modal styles
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '90%', // <600px
      sm: '70%', // ≥600px
      md: '50%', // ≥900px
      lg: '40%', // ≥1200px
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Navbar />
      <div className="grid lg:grid-cols-[1fr_3fr]">
        <div className="shadow hidden lg:block p-5">
          <NavPanel />
        </div>
        <div className="flex flex-col direct rounded-lg gap-4 bg-gray-100 md:px-10 md:py-10">
          <div className="flex items-center bg-white p-5 md:p-10 shadow-lg">
            <img
              src="https://s3-alpha-sig.figma.com/img/77cd/766b/225481949bb96c1ee92e2969c13f92f6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MgA~u1aSsMJWwuIpk-E5xBEOi8XPMninH2z6y2KAx~Azfo37d6ks4SqAolAPot7xsHEQShMTQvRSvv2ClxROmBPnuFzb4JiO7J3woNLPb897H5ndYRF-DWZM8Sa0VAJ6JXOYGEW~T9MVAM0ekDuikPDxbYMydG2BNtvD9lJozuraR2NtjgqszlfemHOanssPqdWEKzriBQjI0JGLu8ULQat5G6sXUQ-wlgwFUOk9L2Cs0ACDND5UVeaOAfrTT8Jh~n6hK9XQ~guO6IMNo47QZ-aR8g-7dP0uSWZmkm7WAsrhh3BYw0LzMYlTzkrGNyWjFd31cLCysbnYIrGUQ9FcMQ__"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">James Wilson</h2>
              <p className="text-gray-500">Subcontractor</p>
            </div>
          </div>

          {/* Showcase Section */}
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 lg:p-15 gap-4">
            <div className="flex flex-row w-full justify-between items-center md:p-4">
              <h1 className="md:text-xl font-poppins" color="initial">
                Showcase
              </h1>
              <div className="flex items-center gap-2">
                {/* Show button on md and above */}
                <div className="hidden sm:flex items-center">
                  <button
                    className="rounded-xl font-poppins text-white bg-blue-500 md:text-lg px-4 py-1 hover:bg-blue-600 transition duration-200"
                    onClick={handleOpen}
                  >
                    Add showcase
                  </button>
                </div>
                {/* Show icon below md */}
                <div className="block sm:hidden">
                  <AddIcon
                    className="bg-blue-500 text-white rounded-xl p-2"
                    sx={{ fontSize: 40 }}
                    onClick={handleOpen}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="md:p-4">
              <h5 className="font-poppins md:text-lg font-medium slate-700">About us</h5>
              <p className="font-poppins md:text-md text-gray-600">
                Hi! We are passionate about bringing delicious food and memorable dining experience to your
                special events. Whether it’s an intimate gathering or grand celebration, I offer a variety of menu
                options tailored to your taste and theme.
              </p>
            </div>
            <Divider />
            {/* Showcase content */}
            {itemData.map((item, index) => (
              <div key={index} className="md:mt-4">
                <div className="flex flex-col gap-4 md:p-4">
                  <h5 className="font-poppins md:text-lg font-medium text-slate-700">
                    {item.title}
                  </h5>
                  <p className="font-poppins md:text-md text-gray-600">{item.description}</p>
                  <div className="w-full max-w-screen-xl mx-auto">
                    <ImageList
                      className="w-full h-auto"
                      cols={item.selectedImage?.length > 2 ? 3 : item.selectedImage?.length}
                      gap={8}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        '@media (max-width: 768px)': {
                          gridTemplateColumns: 'repeat(2, 1fr)',
                        },
                        '@media (max-width: 480px)': {
                          gridTemplateColumns: 'repeat(1, 1fr)',
                        },
                      }}
                    >
                      {item.selectedImage?.map((img, imgIndex) => (
                        <ImageListItem key={imgIndex} className="w-full h-auto">
                          <img
                            src={img.image}
                            alt={img.title}
                            loading="lazy"
                            className="w-full h-auto object-cover rounded-lg"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, position: 'relative' }}>
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.600',
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Content */}
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" fontWeight={600}>
              Add New Showcase Item
            </Typography>
            <Divider />
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              placeholder="Add a description..."
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* Upload Image */}
            <div className="flex flex-row gap-2 ml-auto">
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="upload-image-button"
              />
              <label htmlFor="upload-image-button">
                <Button variant="outlined" component="span">
                  Upload Image
                </Button>
              </label>
              <div>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
            {/* Image Preview */}
            <ImageList
              className="w-full h-auto"
              cols={selectedImage.length > 2 ? 3 : selectedImage.length}
              gap={8}
              sx={{
                width: '100%',
                height: 'auto',
                '@media (max-width: 768px)': {
                  gridTemplateColumns: 'repeat(2, 1fr)',
                },
                '@media (max-width: 480px)': {
                  gridTemplateColumns: 'repeat(1, 1fr)',
                },
              }}
            >
              {selectedImage.length > 0 &&
                selectedImage.map((item, index) => (
                  <ImageListItem key={index} className="w-full relative">
                    {/* X Button */}
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                        zIndex: 10,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    {/* Image Preview */}
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default SubcontractorDashboard;