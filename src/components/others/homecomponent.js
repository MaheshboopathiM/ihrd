import React from 'react'

function Homecomponent() {
    return (
        <>
            <div class="text-light" style={{ backgroundClip: " #111016", marginTop: '-50px' }}>
                <header class="text-light" style={{ backgroundClip: " #111016" }}>
                    <div class="container">
                        <div class="d-flex align-items-center " >
                            <a class="d-flex align-items-center text-decoration-none me-3 text-white" href="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="d-inline-block align-middle me-2 bi bi-bootstrap-reboot" viewBox="0 0 16 16">
                                    <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                                    <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
                                </svg>
                                <span class="fs-4 fw-bold lh-1 text-white">Rembele</span>
                            </a>
                            <ul class="nav flex-nowrap text-nowrap overflow-auto ms-auto" style={{ scrollbarWidth: 'thin' }}>
                                <li class="nav-item">
                                    <a class="nav-link text-white link-info" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-white link-info" href="#">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-white link-info" href="#">Contact</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-white link-info" href="#">Blog</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                <main>
                    <section id="hero" class="py-5" style={{ backgroundColor: '#1a1a1f' }}>
                        <div class="container">
                            {/* <div class="row g-5 row-cols-1 row-cols-md-2">
                        <div class="col">
                            <h1 class="fs-1 mb-3 fw-bold">Lorem ipsum dolor sit amet.</h1>
                            <p class="fs-5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum odio nibh, mollis vitae tellus sit amet, condimentum laoreet mauris. Ut eu condimentum mauris. Aenean consequat urna sapien, et dignissim nisi elementum
                                quis.
                            </p>
                        </div>

                        <div class="col">
                            <div>
                                <img class="img-fluid rounded" src="/assets/img/01.jpg" alt="" />
                            </div>
                        </div>
                    </div> */}
                            <div class="d-flex flex-column flex-column-reverse flex-md-row">
                                <div class="col col-md-5 me-md-5">
                                    <h1 class="fs-1 mb-3 fw-bold">COLLEGE OF APPLIED SCIENCE THODUPUZHA</h1>
                                    <p class="fs-5">
                                        College of Applied Science, Thodupuzha is affiliated to Mahatma Gandhi University and is established in 2000 with regular courses in  MSc (Computer Science), MSc (Electronics). B.Sc (Computer Sciences), BSc (Electronics), and B.Com with Computer Applications.
                                    </p>
                                </div>

                                <div class="col col-md-7">
                                    <div>
                                        <img class="img-fluid rounded mb-4 mb-md-0" src="https://hwnews.in/wp-content/uploads/2022/06/university.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="py-5">
                        <div class="container">
                            <div class="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
                                <div class="col">
                                    <div class="card bg-dark border-0">
                                        {/* <img class="card-img-top" src="https://freebiespic.com/images/2021/IMG_1306_Recipe-for-vegan-clay-pot-noodles_1024.jpg" alt="" /> */}
                                        <div class="card-body">
                                            <h2 class="fs-6 text-light ">
                                                Duration: 2 Years (4 Semesters)</h2>
                                            <h2 class="fs-6 text-light ">
                                                No of Seats: :30</h2><br />
                                            <h2 class="fs-6 text-light ">
                                                Eligibility:</h2>
                                            <h2 class="fs-6 text-light ">
                                                Pass in B.Sc Degree with Mathematics/Computer Science/ Electronics/ IT as one of the subjects
                                                (main/subsidiary) or BCA/B.Tech degree with not less than 55% marks in optional subject.
                                                Candidate having degree in Computer Science/Computer Applications/ IT/ Electronics shall be given a
                                                weightage of 20% marks in the qualifying degree examination.</h2><br />
                                            <h2 class="fs-6 text-light ">
                                                Time of Notification:</h2>
                                            <h2 class="fs-6 text-light ">
                                                First week of August (Just after the publication of degree results of Kerala Govt.)</h2><br />
                                            <a class="text-light link-info   text-decoration-none" href="#">
                                                <h2 class="fs-5">M.Sc Computer Science</h2>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card bg-dark border-0 pt-2 mt-1">
                                        {/* <img class="card-img-top" src="https://freebiespic.com/images/2021/IMG_1306_Recipe-for-vegan-clay-pot-noodles_1024.jpg" alt="" /> */}
                                        <div class="card-body">
                                            <h2 class="fs-6 text-light ">
                                                Duration: 3 Years (6 Semesters).</h2>
                                            <h2 class="fs-6 text-light ">
                                                No of Seats: :40</h2><br />
                                            <h2 class="fs-6 text-light ">
                                                Eligibility:</h2>
                                            <h2 class="fs-6 text-light ">
                                                Pass (Eligible for Higher Studies)In Higher Secondary or Equivalent Examination with
                                                Maths/Statistics/Computer Science/ Computer Application etc. as one of the subjects,
                                                On the basis of marks of optional subjects at higher secondary course.</h2><br />
                                            <h2 class="fs-6 text-light ">
                                                Time of Notification:</h2>
                                            <h2 class="fs-6 text-light ">
                                            First week of June (Just after the publication of +2 results of Kerala Govt.)</h2><br /><br/>
                                            <a class="text-light link-info   text-decoration-none" href="#">
                                                <h2 class="fs-5">BSc Computer Science</h2>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card bg-dark border-0 pt-2 mt-1">
                                        {/* <img class="card-img-top" src="https://freebiespic.com/images/2021/IMG_1306_Recipe-for-vegan-clay-pot-noodles_1024.jpg" alt="" /> */}
                                        <div class="card-body">
                                            <h2 class="fs-6 text-light ">
                                                Duration: 3 Years (6 Semesters).</h2>
                                            <h2 class="fs-6 text-light ">
                                                No of Seats: :40</h2><br />
                                            <h2 class="fs-6 text-light ">
                                                Eligibility:</h2>
                                            <h2 class="fs-6 text-light ">
                                                Pass (Eligible for Higher Studies)In Higher Secondary or Equivalent Examination with
                                                Maths/Statistics/Computer Science/ Computer Application etc. as one of the subjects,
                                                On the basis of marks of optional subjects at higher secondary course.</h2><br />
                                            <h2 class="fs-6 text-light ">
                                                Time of Notification:</h2>
                                            <h2 class="fs-6 text-light ">
                                            First week of June (Just after the publication of +2 results of Kerala Govt.)</h2><br /><br/>
                                            <a class="text-light link-info   text-decoration-none" href="#">
                                                <h2 class="fs-5">B.com Computer Application</h2>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Homecomponent;