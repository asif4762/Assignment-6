const loadCategory = async (item) => {
  const categoryContainer = document.getElementById("card-container");
  const div = document.createElement("div");

  div.innerHTML = `
        <div>
            <div class="flex p-10 bg-[#797DFC1A] border border-[#797DFC] rounded-3xl max-w-[800px]">
                <div class="indicator mr-5">
                    <span id="color" class="indicator-item badge badge-secondary  border-none"></span>
                    <div class="grid w-[50px] bg-white rounded-xl h-[50px] bg-base-300 place-items-center"></div>
                </div>
                <div>
                    <div class="flex gap-5 mb-3">
                        <p class="font-medium text-sm">#${item.category}</p>
                        <p class="font-medium text-sm">Author :${item.author.name}</p>
                    </div>
                    <h1 class="text-[#12132D] text-lg lg:text-xl font-semibold lg:font-bold mb-4">${item.title}</h1>
                    <p class="text-[#12132D99] text-sm lg:text-lg font-normal mb-5">${item.description}</p>
                    <hr />
                    <div class="mt-6 flex justify-between lg:w-[650px]">
                        <div class="flex gap-2 lg:gap-6">
                            <div class="flex gap-1">
                                <div><img src="./images/tabler-icon-message-2.png" alt="" /></div>
                                <p class="text-[#12132D99] lg:text-lg font-normal">${item.comment_count}</p>
                            </div>
                            <div class="flex gap-1">
                                <div><img src="./images/tabler-icon-eye.png" alt="" /></div>
                                <p class="text-[#12132D99] lg:text-lg font-normal">${item.view_count}</p>
                            </div>
                            <div class="flex gap-1">
                                <div><img src="./images/tabler-icon-clock-hour-9.png" alt="" /></div>
                                <p class="text-[#12132D99] lg:text-lg font-normal">${item.posted_time} min</p>
                            </div>
                        </div>
                        <div class="">
                            <button onclick="getTitle('${item.title}','${item.view_count}')">
                                <img src="./images/email 1.png" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  if (item.isActive === true) {
    div.querySelector("#color").classList.add("bg-green-700");
  } else {
    div.querySelector("#color").classList.add("bg-red-700");
  }

  categoryContainer.appendChild(div);
};

const loadIndividuals = async (categoryName) => {
    document.getElementById('loading').style.display = 'block';
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
  );
  const data = await response.json();

  const categoryContainer = document.getElementById("card-container");
  categoryContainer.innerHTML = "";

  if (data.posts.length === 0) {
      alert("No posts available for this category.");
      document.getElementById('loading').style.display = 'none';
    return;
  } else {
        setTimeout(() => {
            data.posts.forEach((item) => {
                loadCategory(item);
            });
            document.getElementById('loading').style.display = 'none';
        }, 2000);
    }
};

const titleContainer = document.getElementById("title-container");
let count = 0;

const getTitle = (itemTitle, views) => {
  // console.log(itemTitle, views);
  count++;
  const countContainer = document.getElementById("count-container");
  countContainer.innerText = count;
  const div = document.createElement("div");
  div.innerHTML = `
    <div
            class="flex shadow-xl bg-white gap-4 p-4 mt-4 rounded-2xl justify-center items-center"
          >
            <h1>${itemTitle}</h1>
            <div>
              <div class="flex">
                <img src="./images/tabler-icon-eye.png" alt="" />
                <p class="">${views}</p>
              </div>
            </div>
          </div>
    `;
  titleContainer.appendChild(div);
};

const handleSearch = () => {
  const text = document.getElementById("search-box").value;
  console.log(text);
  if (text) {
    loadIndividuals(text);
  } else {
    alert("Please Enter A Valid Input");
  }
};

const loadLatest = async () => {
    
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await response.json();

  const latestContainer = document.getElementById("latest-container");

    data.forEach((item) => {
      document.getElementById('loading').classList.add('hidden');
    // console.log(item);
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="border border-[#12132D26] rounded-3xl">
        <div class="p-6">
            <div class="rounded-[20px]">
            <img src="${item.cover_image}" alt="">
        </div>
        <div class="flex justify-start items-center mt-6">
            <div>
                <img src="./images/Frame (15).png" alt="">
            </div>
            <h1 id="date" class="text-[#12132D99] text-sm">${item.author.posted_date || 'No publish date'}</h1>
        </div>
        <h1 class="text-[#12132D] text-lg font-extrabold mt-4">What will a mars habitat force that impact in our daily life!!!</h1>
        <p class="text[#12132D99] text-sm font-normal mt-3">Yes, you can run unit tests and view the results directly within the app. </p>
        <div class="flex mt-4">
            <div class="mr-4 w-10 h-10">
                <img class="rounded-3xl" src="${item.profile_image}" alt="">
            </div>
            <div>
                <p class="text-[#12132D] text-sm font-bold">${item.author.name}</p>
            <p>${item.author.designation || 'Unknown'}</p>
            </div>
        </div>
        </div>
      </div>
      `;
      latestContainer.appendChild(div);
      
  });
};
loadLatest();
loadIndividuals("comedy");

// loadCategory('');
