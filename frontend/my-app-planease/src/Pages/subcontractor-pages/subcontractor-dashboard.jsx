import { useState, useRef } from 'react';
import Divider from '@mui/material/Divider';
import Navbar from "../../Components/Navbar";
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NavPanel from "../../Components/subcon-navpanel";
import '../../index.css';
import { Box, IconButton, Modal, Stack, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SubcontractorDashboard = () => {

  const [activeGallery, setActiveGallery] = useState(null); // { images: [], index: 0 }

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutUsText, setAboutUsText] = useState("Hi! We are passionate about bringing delicious food and memorable dining experience to your special events...");

  const [open, setOpen] = useState(false);
  const [editMediaOpen, setEditMediaOpen] = useState(false);

  const [itemData, setItemData] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const dropRef = useRef(null);

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImage((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = () => {
    const newItem = {
      title,
      description,
      selectedImage: selectedImage.map((img) => ({
        image: img.image,
        title: img.title,
      })),
    };
    setItemData((prev) => [...prev, newItem]);
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
    setSelectedImage((prev) => [...prev, ...imageArray]);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '90%',
      sm: '70%',
      md: '50%',
      lg: '40%',
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
              <                h2 className="text-lg font-semibold">James Wilson</h2>
              <p className="text-gray-500">Subcontractor</p>
            </div>
          </div>

          {/* Showcase Section */}
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 lg:p-15 gap-4">
            <div className="flex flex-row w-full justify-between items-center md:p-4">
              <h1 className="md:text-xl font-poppins">Showcase</h1>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center">
                  <button
                    className="rounded-xl font-poppins text-white bg-blue-500 md:text-lg px-4 py-1 hover:bg-blue-600 transition duration-200"
                    onClick={handleOpen}
                  >
                    Add showcase
                  </button>
                </div>
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
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="medium" className="font-poppins md:text-lg">
                  About us
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setIsEditingAbout((prev) => !prev)}
                  sx={{ color: 'gray' }}
                >
                  <EditIcon sx={{ color: 'grey-600' }} />
                </IconButton>
              </Box>

              {!isEditingAbout ? (
                <Typography className="font-poppins md:text-md text-gray-600 whitespace-pre-line">
                  {aboutUsText}
                </Typography>
              ) : (
                <Box mt={2}>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    value={aboutUsText}
                    onChange={(e) => setAboutUsText(e.target.value)}
                  />
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setIsEditingAbout(false)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </div>

            <Divider />
            {/* Showcase Items */}
            {itemData.map((item, index) => (
  <div key={index} className="py-6">
    {/* Title + Ellipsis */}
    <Box display="flex" justifyContent="space-between" alignItems="start">
      <Typography
        variant="h6"
        fontWeight="bold"
        className="font-poppins text-lg text-slate-800"
      >
        {item.title}
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          size="small"
          onClick={() => {
            const menu = document.getElementById(`menu-${index}`);
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>
            &#8942;
          </Typography>
        </IconButton>
        <Box
          id={`menu-${index}`}
          sx={{
            display: 'none',
            position: 'absolute',
            right: 0,
            zIndex: 10,
            mt: 1,
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 1,
            boxShadow: 3,
            minWidth: 120,
          }}
        >
          <Button
            fullWidth
            sx={{ justifyContent: 'flex-start', color: 'black' }}
            startIcon={<EditIcon />}
            onClick={() => alert(`Edit: ${item.title}`)}
          >
            Edit
          </Button>
          <Button
            fullWidth
            sx={{ justifyContent: 'flex-start', color: 'black' }}
            startIcon={<CloseIcon />}
            onClick={() =>
              setItemData((prev) => prev.filter((_, i) => i !== index))
            }
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>

    {/* Description */}
    <Typography className="font-poppins text-gray-700 mt-2 mb-3 whitespace-pre-line">
      {item.description}
    </Typography>

    {/* Image Rendering Logic */}
    {item.selectedImage.length > 0 && (
      <Box>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1}>
          {item.selectedImage.slice(0, 3).map((img, imgIndex) => (
            <Box
              key={imgIndex}
              position="relative"
              onClick={() =>
                setActiveGallery({ images: item.selectedImage, index: imgIndex })
              }
              sx={{ cursor: 'pointer' }}
            >
              <img
                src={img.image}
                alt={img.title}
                loading="lazy"
                className="rounded-lg w-full h-[150px] object-cover"
              />
              {imgIndex === 2 && item.selectedImage.length > 3 && (
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="rgba(0, 0, 0, 0.5)"
                  borderRadius="8px"
                >
                  <Typography variant="h6" color="white" fontWeight="bold">
                    +{item.selectedImage.length - 3} more
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    )}


    {/* Divider after each post */}
    <Divider sx={{ mt: 4 }} />
  </div>
))}

          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, position: 'relative' }}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>Create post</Typography>
            <Divider />
            <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box
              ref={dropRef}
              onClick={() => document.getElementById('upload-image-button').click()}
              sx={{
                border: '2px dashed #ccc',
                borderRadius: '12px',
                padding: '32px',
                textAlign: 'center',
                color: '#666',
                cursor: 'pointer',
                backgroundColor: theme.palette.grey[50],
                '&:hover': { backgroundColor: theme.palette.grey[100] },
              }}
            >
              <CloudUploadIcon fontSize="large" sx={{ color: '#90a4ae' }} />
              <Typography variant="body1" mt={1}>
                Drop file(s) here or <span style={{ color: '#1976d2', textDecoration: 'underline' }}>browse to upload</span>
              </Typography>
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="upload-image-button"
              />
            </Box>
            {selectedImage.length > 0 && (
              <Box>
                <ImageList cols={3} gap={8}>
                  {selectedImage.slice(0, 3).map((item, index) => (
                    <ImageListItem key={index} sx={{ position: 'relative' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '160px',
                          objectFit: 'contain',
                          borderRadius: '12px',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          zIndex: 10,
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </ImageListItem>
                  ))}
                  {selectedImage.length > 3 && (
                    <ImageListItem
                      onClick={() => setEditMediaOpen(true)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '8px',
                      }}
                    >
                      <Typography fontWeight="bold" color="primary">
                        +{selectedImage.length - 3} more
                      </Typography>
                    </ImageListItem>
                  )}
                </ImageList>
              </Box>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Button variant="text" onClick={() => setEditMediaOpen(true)}>
                Edit All
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>

      {/* Fullscreen Edit Modal */}
      <Modal open={editMediaOpen} onClose={() => setEditMediaOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" mb={2}>Edit Uploaded Media</Typography>

          <ImageList cols={3} gap={16}>
            {selectedImage.map((item, index) => (
              <ImageListItem
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 220,
                  backgroundColor: '#f5f5f5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
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
              </ImageListItem>
            ))}
          </ImageList>

          <Box mt={4} display="flex" justifyContent="space-between">
            <label htmlFor="edit-upload-image-button">
              <Button variant="outlined" component="span">Add More Images</Button>
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="edit-upload-image-button"
              />
            </label>
            <Button variant="contained" onClick={() => setEditMediaOpen(false)}>Done</Button>
          </Box>
        </Box>
      </Modal>
      {/* Fullscreen Viewer */}
              {/* Fullscreen Viewer Modal */}
<Modal
  open={!!activeGallery}
  onClose={() => setActiveGallery(null)}
  sx={{
    backdropFilter: 'blur(6px)', // 🔵 BLUR BACKGROUND
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dim + blur
    zIndex: 1300,
  }}
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '900px',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {activeGallery && (
      <>
        <img
          src={activeGallery.images[activeGallery.index].image}
          alt="Preview"
          style={{
            maxHeight: '70vh',
            maxWidth: '100%',
            borderRadius: '12px',
            objectFit: 'contain',
            boxShadow: '0px 0px 20px rgba(0,0,0,0.5)',
          }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mt={2}
          px={2}
        >
          <Button
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            color: 'white'
          }}
            variant="outlined"
            color="inherit"
            onClick={() =>
              setActiveGallery((prev) => ({
                ...prev,
                index:
                  prev.index === 0
                    ? prev.images.length - 1
                    : prev.index - 1,
              }))
            }
          >
            Prev
          </Button>
          <Typography color="white">
            {activeGallery.index + 1} / {activeGallery.images.length}
          </Typography>
          <Button
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            color: 'white'
          }}
            variant="outlined"
            color="inherit"
            onClick={() =>
              setActiveGallery((prev) => ({
                ...prev,
                index:
                  prev.index === prev.images.length - 1
                    ? 0
                    : prev.index + 1,
              }))
            }
          >
            Next
          </Button>
        </Box>
      </>
    )}
  </Box>
</Modal>

    </div>
  );
};

export default SubcontractorDashboard;
