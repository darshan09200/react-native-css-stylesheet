/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Image, ImageStyle, ScrollView, Text, View } from "react-native";

import CssStyleSheet, { useCssStyleSheet } from "react-native-css-stylesheet";

const responsiveImage = require("../assets/responsive.jpg");
const programmerImage = require("../assets/programmer.jpg");

const ResponsiveCard = (): JSX.Element => {
	const styles = useCssStyleSheet(responsiveStyles);
	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<View style={[styles.container, styles.card1Container]}>
				<View style={styles.imageContainer}>
					<Image
						source={responsiveImage}
						/**
						 * Refer this answer: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29265#issuecomment-430628650
						 * Only needs to be done in typescript
						 */
						style={styles.image as ImageStyle}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.contentContainer}>
					<Text style={styles.header}>Responsive Design</Text>
					<Text style={styles.content}>
						This page is responsive to layout changes
					</Text>
					<View style={styles.list}>
						<View style={styles.listItem}>
							<View style={styles.bullet} />
							<Text style={styles.listContent}>
								When your phone is in portrait mode, you will
								see image fill to width and content below it.
							</Text>
						</View>
						<View style={styles.listItem}>
							<View style={styles.bullet} />
							<Text style={styles.listContent}>
								When your phone is in landscape mode, you will
								see image fill to height and content besides it.
							</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={[styles.container, styles.card2Container]}>
				<Text style={[styles.header, styles.displayPortrait]}>
					Darshan Jain
				</Text>

				<View style={styles.imageContainer}>
					<Image
						source={programmerImage}
						/**
						 * Refer this answer: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29265#issuecomment-430628650
						 * Only needs to be done in typescript
						 */
						style={[styles.image as ImageStyle, { aspectRatio: 1 }]}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.contentContainer}>
					<Text style={[styles.header, styles.displayLandscape]}>
						Darshan Jain
					</Text>
					<View style={styles.descriptionContainer}>
						<Text style={styles.content}>Background</Text>
						<View style={styles.list}>
							<View style={styles.listItem}>
								<View style={styles.bullet} />
								<Text style={styles.listContent}>
									Currently working as Junior React Native
									Developer from April 2021
								</Text>
							</View>
							<View style={styles.listItem}>
								<View style={styles.bullet} />
								<Text style={styles.listContent}>
									Worked as a full stack developer for 8
									months
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.sectionContainer}>
						<View style={styles.section}>
							<Text style={styles.content}>Technical Skills</Text>
							<View style={styles.list}>
								<View style={styles.listItem}>
									<View style={styles.bullet} />
									<Text style={styles.listContent}>
										React Native
									</Text>
								</View>
								<View style={styles.listItem}>
									<View style={styles.bullet} />
									<Text style={styles.listContent}>
										React Js
									</Text>
								</View>
								<View style={styles.listItem}>
									<View style={styles.bullet} />
									<Text style={styles.listContent}>
										Firebase
									</Text>
								</View>
								<View style={styles.listItem}>
									<View style={styles.bullet} />
									<Text style={styles.listContent}>
										Typescript
									</Text>
								</View>
							</View>
						</View>
						<View style={styles.section}>
							<Text style={styles.content}>Hobbies</Text>
							<View style={styles.list}>
								<View style={styles.listItem}>
									<View style={styles.bullet} />
									<Text style={styles.listContent}>
										Programming
									</Text>
								</View>
								<View style={styles.listItem}>
									<View style={styles.bullet} />
									<Text style={styles.listContent}>
										Badminton
									</Text>
								</View>
								<View style={styles.listItem}>
									<View style={styles.bullet} />
									<Text style={styles.listContent}>
										Chess
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const { responsiveStyles } = CssStyleSheet.create({
	bullet: {
		backgroundColor: "#c4c4c4",
		borderRadius: 7.5,
		height: 7.5,
		marginRight: "0.5rem",
		marginTop: "0.5rem",
		width: 7.5,
	},
	card1Container: {
		borderColor: "#c4c4c4",
		borderRadius: "1rem",
		borderWidth: 1,
		margin: "1rem",
		padding: "1rem",
	},
	card2Container: {
		borderColor: "#c4c4c4",
		borderRadius: "1rem",
		borderWidth: 1,
		margin: "1rem",
		padding: "1rem",
	},
	container: {
		"(orientation: landscape)": {
			flexDirection: "row",
		},
		flexDirection: "column",
	},
	content: {
		fontSize: "1rem",
		marginTop: "0.5rem",
	},
	contentContainer: {
		flexGrow: 1,
	},
	description: {
		fontSize: "1.25rem",
	},
	descriptionContainer: {},
	displayLandscape: {
		"(orientation: portrait)": {
			display: "none",
		},
	},
	displayPortrait: {
		"(orientation: landscape)": {
			display: "none",
		},
		textAlign: "center",
	},
	header: { fontSize: "2rem" },
	image: {
		aspectRatio: 626 / 463,
		height: undefined,
		width: "100%",
	},
	imageContainer: {
		"(orientation: landscape)": {
			flexGrow: 1,
			marginHorizontal: "1.5vmax",
			maxWidth: "40vw",
		},
		"(orientation: portrait)": {
			marginVertical: "1.5vmax",
		},
		borderRadius: 10,
		overflow: "hidden",
	},
	list: {
		marginHorizontal: "0.5rem",
	},
	listContent: {
		flex: 1,
		flexWrap: "wrap",
		fontSize: "0.8rem",
	},
	listItem: {
		flexDirection: "row",
		marginTop: "0.25rem",
	},
	scrollView: {
		backgroundColor: "#fff",
		flexGrow: 1,
	},
	section: {
		flex: 1,
		marginRight: "1rem",
	},
	sectionContainer: {
		"(orientation: landscape)": {
			flex: 1,
			flexDirection: "row",
			flexWrap: "wrap",
		},
		flexDirection: "column",
		position: "relative",
	},
});

export default ResponsiveCard;
