async function fetchJson() {
    const response = await fetch('updated_content_directory.json');
    const data = await response.json();
    return data;
}

let ncert_state = 0;

async function subSectionCreator(section, subSection) {
    const data = await fetchJson();
    let secnum;
    let dir = document.createElement("img");
    dir.setAttribute("class", "direction");
    dir.setAttribute("src", "back.svg");
    dir.addEventListener("click", () => { stateUpdater(0, section) });

    let tp = document.createElement("p");
    tp.innerText = "Choose Class";

    let head;
    let d;
    if (section === "ncert") {
        secnum = 0;
    } else {
        secnum = 1;
    }
    
    head = document.getElementsByClassName("cbox")[secnum].getElementsByClassName("boxhead")[0];
    d = document.getElementsByClassName("cbox")[secnum].getElementsByClassName("ns")[0];

    head.innerHTML = "";
    d.innerHTML = "";
    head.appendChild(dir);
    head.appendChild(tp);


    Object.keys(data[section][subSection]).forEach(className => {
        let op = document.createElement("div"); // Create a new div for each class
        op.setAttribute("class", "ops");
        op.style.width = "100%";
        op.style.fontSize = "3vh";
        op.innerText = className; // Set the class name as text
        op.addEventListener("click", (event) => { sub2(section, subSection, event.target) })
        d.appendChild(op); // Append the new div to the container
    });
}

async function sub2(section, subSection, th) {
    const data = await fetchJson();
    let secnum;
    if (section === "ncert") {
        secnum = 0;
    } else {
        secnum = 1;
    }
    let head = document.getElementsByClassName("cbox")[secnum].getElementsByClassName("boxhead")[0];
    head.innerHTML = "";

    let dir = document.createElement("img");
    dir.setAttribute("class", "direction");
    dir.setAttribute("src", "back.svg");
    dir.addEventListener("click", () => { stateUpdater(1, section, subSection) });

    let tp = document.createElement("p");
    tp.innerText = "Choose Subject";

    head.appendChild(dir);
    head.appendChild(tp);
    let d3 = document.getElementsByClassName("cbox")[secnum].getElementsByClassName("ns")[0];
    d3.innerHTML = "";

    Object.keys(data[section][subSection][th.innerText]).forEach(subName => {
        let op = document.createElement("div"); // Create a new div for each subject
        op.setAttribute("class", "ops");
        op.style.width = "100%";
        op.style.fontSize = "3vh";
        op.innerText = subName; // Set the subject name as text
        op.addEventListener("click", () => {
            let url = data[section][subSection][th.innerText][subName];
            if (url) {
                window.open(url, "_blank"); // Open the link in a new tab
            } else {
                alert("No link available for this subject.");
            }
        });
        d3.appendChild(op); // Append the new div to the container
    });
}

async function stateUpdater(n, section, sub_section) {

    const data = await fetchJson();

    if (section === "ncert") {
        if (n === 0) {
            let head = document.getElementsByClassName("cbox")[0].getElementsByClassName("boxhead")[0];
            head.innerHTML = "";

            let tp = document.createElement("p");
            tp.innerText = "NCERT Books & Solutions";
            head.appendChild(tp);

            let d1 = document.getElementsByClassName("cbox")[0].getElementsByClassName("ns")[0];
            d1.innerHTML = `
                <div class="ops">
                    <img class="heroimg" src="ncert_logo_english.svg">
                    <span>Latest (24-25) NCERT Book</span>
                </div>
                <div class="ops">
                    <img class="heroimg" src="ncert_logo_hindi.svg">
                    <span>Latest (24-25) NCERT Book</span>
                </div>
                <div class="ops">
                    <img class="heroimg" src="ncert_sol.svg">
                    <span>NCERT Solutions</span>
                </div>
                <div class="ops">
                    <img class="heroimg" src="ncert_notes.svg">
                    <span>NCERT Notes</span>
                </div>
                <div class="ops">
                    <img class="heroimg" src="ncert_video.svg">
                    <span>Explaination Videos</span>
                </div>
            `;

            //--------------Activity on selecting options under ncert---------------//
            document.getElementsByClassName("ops")[0].addEventListener("click", () => { stateUpdater(1, "ncert", "english_ncert_book") });
            document.getElementsByClassName("ops")[1].addEventListener("click", () => { stateUpdater(1, "ncert", "hindi_ncert_book") });
            document.getElementsByClassName("ops")[2].addEventListener("click", () => { stateUpdater(1, "ncert", "ncert_solution") });
            document.getElementsByClassName("ops")[3].addEventListener("click", () => { stateUpdater(1, "ncert", "ncert_notes") });
            document.getElementsByClassName("ops")[4].addEventListener("click", () => { stateUpdater(1, "ncert", "explanation_videos") });

        }
        if (n === 1) {
            if (sub_section === "english_ncert_book") {
                subSectionCreator("ncert", "english_ncert_book");
            }
            if (sub_section === "hindi_ncert_book") {
                subSectionCreator("ncert", "hindi_ncert_book");
            }
            if (sub_section === "ncert_solution") {
                subSectionCreator("ncert", "ncert_solution");
            }
            if (sub_section === "ncert_notes") {
                subSectionCreator("ncert", "ncert_notes");
            }
            if (sub_section === "explanation_videos") {
                subSectionCreator("ncert", "explanation_videos");
            }
        }
        if (n === 2) {

        }
    }
    if (section === "support_material") {
        if (n === 0) {
            let head = document.getElementsByClassName("cbox")[1].getElementsByClassName("boxhead")[0];
            head.innerHTML = "";

            let tp = document.createElement("p");
            tp.innerText = "Support Material";
            head.appendChild(tp);

            let d2 = document.getElementsByClassName("cbox")[1].getElementsByClassName("ns")[0];
            d2.innerHTML = `
                <div class="ops">
                    <img class="heroimg" src="sample_papers.svg">
                    <span>Sample Papers</span>
                </div>
                <div class="ops">
                    <img class="heroimg" src="syllabus.svg">
                    <span>Syllabus</span>
                </div>
                <div class="ops">
                    <img class="heroimg" src="useful_books.svg">
                    <span>Useful Books</span>
                </div>
            `;

            //--------------Activity on selecting options under support mataerial---------------//
            document.getElementsByClassName("ops")[5].addEventListener("click", () => { stateUpdater(1, "support_material", "sample_paper") });
            document.getElementsByClassName("ops")[6].addEventListener("click", () => { stateUpdater(1, "support_material", "syllabus") });
            document.getElementsByClassName("ops")[7].addEventListener("click", () => { stateUpdater(1, "support_material", "useful_books") });
        }
        if (n === 1) {
            if (sub_section === "sample_paper") {
                subSectionCreator("support_material", "sample_paper");
            }
            if (sub_section === "syllabus") {
                subSectionCreator("support_material", "syllabus");
            }
            if (sub_section === "useful_books") {
                subSectionCreator("support_material", "useful_books");
            }
        }
    }
}


async function main() {
    const data = await fetchJson();
    //--------------Activity on selecting options under ncert---------------//
    document.getElementsByClassName("ops")[0].addEventListener("click", () => { stateUpdater(1, "ncert", "english_ncert_book") });
    document.getElementsByClassName("ops")[1].addEventListener("click", () => { stateUpdater(1, "ncert", "hindi_ncert_book") });
    document.getElementsByClassName("ops")[2].addEventListener("click", () => { stateUpdater(1, "ncert", "ncert_solution") });
    document.getElementsByClassName("ops")[3].addEventListener("click", () => { stateUpdater(1, "ncert", "ncert_notes") });
    document.getElementsByClassName("ops")[4].addEventListener("click", () => { stateUpdater(1, "ncert", "explanation_videos") });
    document.getElementsByClassName("ops")[5].addEventListener("click", () => { stateUpdater(1, "support_material", "sample_paper") });
    document.getElementsByClassName("ops")[6].addEventListener("click", () => { stateUpdater(1, "support_material", "syllabus") });
    document.getElementsByClassName("ops")[7].addEventListener("click", () => { stateUpdater(1, "support_material", "useful_books") });
}
main()
