async function getImageFile(
  imageFile: FormDataEntryValue | null,
): Promise<string | undefined> {
  if (!imageFile) {
    return;
  }

  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', 'uploads');

  const response = await fetch(
    'https://api.cloudinary.com/v1_1/b6oe5zow/image/upload',
    {
      method: 'POST',
      body: formData,
    },
  );
  const data: { secure_url: string } = await response.json();
  return data.secure_url;
}
export { getImageFile };
