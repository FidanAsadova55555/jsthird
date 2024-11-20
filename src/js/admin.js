const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 3000, 
});
const logoHtml=document.getElementById("logotabledata")

const fetchDynamicApiData = async (url, cb) => {
  try {
    const res = await instance.get(url);
    cb(res.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const createLogo=async (url,data)=>{
  await instance.post(url,data).then((res) => {
    fetchDynamicApiData("/data")
  
  });
};
const justDeleteLogo=async(url,id)=>{
  await instance.delete(`${url}/${id}`).then((res)=>{
    fetchDynamicApiData("/data")

  })
};

const showLogoApiData = async (data) => {
  data && data.forEach((blog, index) => {
      const logoData = `<tr>
      <th class="align" scope="row">${++index}</th>
      <td class="align">
      <div class="tableimg">
                <img  src="${blog?.img ?? 'https://picsum.photos/200/300'}" alt="" />
</div>
      </td>
      <td class="align">
      <button id=${blog?.id} class="btn-danger shadow-none deletelogobyid">delete</button>
      </td>
    </tr>`;
    logoHtml.innerHTML+=logoData;
    const deleteLogoById = document.getElementsByClassName("deletelogobyid");
    Array.from(deleteLogoById).forEach((deleteLogo) => {
      deleteLogo.addEventListener("click", (e) => {
        e.preventDefault();
        let ID = e.target.id;
        justDeleteLogo("/data", ID);
      });
    });
    
        });
};
fetchDynamicApiData("/data", (data) => {
  showLogoApiData(data);
});
const createLogoForm=document.getElementById("createlogoform");
const logoImg=document.getElementById("img");
createLogoForm&&createLogoForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  let fileReader = new FileReader();
  fileReader.onload = () => {
    let payload = {
      id:crypto.randomUUID(),
      img: fileReader.result,
  
    };
    createLogo("/data",payload)
  };
  
    fileReader.readAsDataURL(logoImg.files[0]); 

});