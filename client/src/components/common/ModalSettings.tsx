import {
  Input,
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { FaUserEdit } from "react-icons/fa";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import { updateUser } from "../../lib/api";
import Button from "../ui/Button";
import { AuthContext } from "../../context/AuthContext";

const ModalSettings = ({ openModalSettings, setOpenModalSettings, user }: any) => {
  const { setUser } = useContext(AuthContext);
  const [ userName, setUserName ] = useState(user.username); 
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [onProcess, setOnProcess] = useState(false);
  console.log(selectedImage);
  const handleOpen = () => setOpenModalSettings(!openModalSettings);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const saveChanges = async () => {
    setOnProcess(true);

    const formData = new FormData();
    
    if (selectedImage) {
      formData.append('profileImage', selectedImage);
    }
    formData.append('username', userName);
    
    try {
      const response:any = await updateUser(formData);
      console.log(response);

      if(response.status == 200){
        setUser((p:any)=> {
          return {...p, image: response.data.image, username: userName }
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }finally{
      setOnProcess(false);
    }
    setOpenModalSettings(false);
  };

  return (
    <>
      <Dialog open={openModalSettings} handler={handleOpen} className="w-[90%] md:w-1/2 xl:w-1/3 m-auto mt-16 shadow-md border-2 p-4 bg-gray-50">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            User Settings
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
          </Typography>
          <XMarkIcon className="h-4 w-4 stroke-2 !absolute right-3.5 top-3.5 cursor-pointer" onClick={() => setOpenModalSettings(false)} />
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Picture
            </Typography>
            <div className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-image-input"
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-input" className="cursor-pointer">
                {
                  previewImage ? (
                    <img src={previewImage} className="w-32 h-32 object-cover rounded-full" />
                  ) : user.image !== "default" ? (
                    <img src={`http://localhost:8000${user.image}`} className="w-32 h-32 object-cover rounded-full" />
                  ) : (
                    <FaUser className="w-32 h-32 text-gray-700 object-fill rounded-full p-1" />
                  )
                }
                <FaUserEdit className="absolute bottom-0 left-0 text-2xl"/>
              </label>
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
              name="name"
              className="placeholder:opacity-100"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button onClick={()=> saveChanges()} variant="green" disabled={onProcess} size="lg">
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ModalSettings;