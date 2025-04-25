import {beforeEach, describe, expect, test} from "vitest";
import {fireEvent, render, type RenderResult, waitFor} from "@testing-library/vue";
import Cookie from "./Cookie.vue";

describe('cookie', () => {
    let cookieComponent: RenderResult

    beforeEach(() => {
        cookieComponent = render(Cookie)
    })

    test('increment counter on click', async () => {
        const cookie = cookieComponent.getByRole('img')
        await fireEvent.click(cookie);


        assertAmountOfCookies(1)
    })

    test('decrease amount of cookies when buying a robot', async () => {
        await getFiveCookies()

        assertAmountOfCookies(5);

        await buyOneRobot()

        await waitFor(() => {
            assertAmountOfCookies(0)
        })
    })

    test('increment counter automatically', async () => {
        await getFiveCookies();
        assertAmountOfCookies(5)

        await buyOneRobot()

        await waitFor(async () => {
            assertAmountOfCookies(1)
        }, { timeout: 1000})
    })

    test('show amount of robots bought', async () => {
        await getFiveCookies();

        await buyOneRobot();

        await waitFor(async () => {
            const oneRobotBought = cookieComponent.getByRole('button', {name: 'Robots: 1'});
            expect(oneRobotBought).toBeDefined()
        })

    })

    async function getFiveCookies() {
        const cookie = cookieComponent.getByRole('img')
        for (let i = 0; i < 5; i++) {
            await fireEvent.click(cookie);
        }
    }

    function assertAmountOfCookies(amountToBeAsserted: number) {
        const counterWith5Cookies = cookieComponent.getByText(`Cookies ${amountToBeAsserted}`);

        expect(counterWith5Cookies).toBeDefined()
    }

    async function buyOneRobot() {
        const autoClicker = cookieComponent.getByRole('button')
        await fireEvent.click(autoClicker);
    }
});
